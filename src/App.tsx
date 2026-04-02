import { useState, useEffect, FormEvent } from "react";
import * as C from "./App.styles";
import * as Photos from "./services/photos";
import { Photo } from "./types/Photo";
import { PhotoItem } from "./components/PhotoItem";

const App = () => {
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);

  const isConfigured = !!(
    process.env.REACT_APP_FIREBASE_APIKEY &&
    process.env.REACT_APP_FIREBASE_STORAGEBUCKET
  );

  const [status, setStatus] = useState<
    "online" | "offline" | "warning" | "checking"
  >("checking");

  useEffect(() => {
    const checkConnection = async () => {
      if (!window.navigator.onLine) {
        setStatus("offline");
        return;
      }
      if (!isConfigured) {
        setStatus("warning");
        return;
      }

      setStatus("checking");
      try {
        // A direct call to getAll() will verify the configuration and connection
        await Photos.getAll();
        setStatus("online");
      } catch (e) {
        setStatus("warning");
      }
    };

    checkConnection();

    const handleStatusChange = () => {
      if (!window.navigator.onLine) {
        setStatus("offline");
      } else {
        checkConnection();
      }
    };

    window.addEventListener("online", handleStatusChange);
    window.addEventListener("offline", handleStatusChange);

    return () => {
      window.removeEventListener("online", handleStatusChange);
      window.removeEventListener("offline", handleStatusChange);
    };
  }, [isConfigured]);

  useEffect(() => {
    const getPhotos = async () => {
      if (!isConfigured) return;
      setLoading(true);
      try {
        setPhotos(await Photos.getAll());
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    getPhotos();
  }, [isConfigured]);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = formData.get("image") as File;

    if (file && file.size > 0) {
      setUploading(true);
      const result = await Photos.insert(file);
      setUploading(false);

      if (result instanceof Error) {
        alert(`${result.name}: ${result.message}`);
      } else {
        const newPhotoList = [...photos];
        newPhotoList.push(result);
        setPhotos(newPhotoList);
      }
    }
  };

  const handleDelete = async (name: string) => {
    setLoading(true);
    await Photos.deletePhoto(name);
    let newPhotoList = photos.filter((item) => item.name !== name);
    setPhotos(newPhotoList);
    setLoading(false);
  };

  return (
    <C.Container>
      <C.Area>
        <C.StatusIndicator $status={status}>
          <C.StatusDot $status={status} />
          {status === "checking" && "Checking..."}
          {status === "online" && "Firebase Online"}
          {status === "warning" && "Missing Configuration"}
          {status === "offline" && "Firebase Offline"}
        </C.StatusIndicator>
        <C.Header>Gallery</C.Header>

        <C.UploadForm method="POST" onSubmit={handleFormSubmit}>
          <input type="file" name="image" />
          <input type="submit" value="Send" />
          {uploading && "Sending..."}
        </C.UploadForm>

        {loading && (
          <C.ScreenWarning>
            <div className="emoji">⏳</div>
            <div>Loading...</div>
          </C.ScreenWarning>
        )}

        {!loading && photos.length > 0 && (
          <C.PhotoList>
            {photos.map((item, index) => (
              <PhotoItem
                key={index}
                url={item.url}
                name={item.name}
                onDelete={handleDelete}
              />
            ))}
          </C.PhotoList>
        )}

        {!loading && photos.length === 0 && (
          <C.ScreenWarning>
            <div className="emoji">😔</div>
            <div>No photos found.</div>
          </C.ScreenWarning>
        )}
      </C.Area>
    </C.Container>
  );
};

export default App;
