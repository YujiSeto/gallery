import { useState, useEffect, FormEvent } from "react";
import * as C from "./App.styles";
import * as Photos from "./services/photos";
import { Photo } from "./types/Photo";
import { PhotoItem } from "./components/PhotoItem";
import { DEMO_PHOTOS } from "./libs/demo";


const App = () => {
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [photoName, setPhotoName] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");


  const isConfigured = !!(

    process.env.REACT_APP_FIREBASE_APIKEY &&
    process.env.REACT_APP_FIREBASE_STORAGEBUCKET
  );

  const [status, setStatus] = useState<
    "online" | "offline" | "warning" | "checking" | "demo"
  >("checking");

  useEffect(() => {
    const checkConnection = async () => {
      if (isDemoMode) {
        setStatus("demo");
        return;
      }
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
  }, [isConfigured, isDemoMode]);

  useEffect(() => {
    const getPhotos = async () => {
      setPhotos([]);
      if (isDemoMode) {
        setLoading(true);
        setPhotos(DEMO_PHOTOS);
        setLoading(false);
        return;
      }
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
  }, [isConfigured, isDemoMode]);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      setPhotoName(file.name.split(".").shift() || "");
    } else {
      setPreviewUrl("");
      setPhotoName("");
    }
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    const form = e.currentTarget;

    const formData = new FormData(form);
    const file = formData.get("image") as File;


    const finalName = photoName.trim() || file.name.split(".").shift() || "Photo";

    if (isDemoMode && file && file.size > 0) {
      setUploading(true);
      setTimeout(() => {
        const newPhoto: Photo = {
          name: finalName,
          url: URL.createObjectURL(file),
        };
        setPhotos((prev) => [...prev, newPhoto]);
        setUploading(false);
        setPreviewUrl("");
        setPhotoName("");
        form.reset();
      }, 1000);
      return;
    }




    if (file && file.size > 0) {
      setUploading(true);
      try {
        const result = await Photos.insert(file, photoName.trim());
        if (result instanceof Error) {
          alert(`${result.name}: ${result.message}`);
        } else {
          setPhotos((prev) => [...prev, result]);
          setPreviewUrl("");
          setPhotoName("");
          form.reset();
        }
      } catch (e) {
        alert("Upload failed. Please check your connection.");
      } finally {
        setUploading(false);
      }
    }
  };





  const handleDelete = async (name: string) => {
    if (isDemoMode) {
      setLoading(true);
      setPhotos((prev) => prev.filter((item) => item.name !== name));
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      await Photos.deletePhoto(name);
      setPhotos((prev) => prev.filter((item) => item.name !== name));
    } catch (e) {
      alert("Delete failed. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <C.Container>
      <C.Area>
        <C.DemoButton onClick={() => setIsDemoMode(!isDemoMode)}>
          {isDemoMode ? "Exit Demo Mode" : "Use Demo Mode"}
        </C.DemoButton>
        <C.StatusIndicator $status={status}>
          <C.StatusDot $status={status} />
          {status === "checking" && "Checking..."}
          {status === "online" && "Firebase Online"}
          {status === "warning" && "Missing Configuration"}
          {status === "offline" && "Firebase Offline"}
          {status === "demo" && "Demo Mode Active"}
        </C.StatusIndicator>

        <C.Header>Gallery</C.Header>

        <C.UploadForm method="POST" onSubmit={handleFormSubmit}>
          <label htmlFor="file-upload">Choose File</label>
          <input
            id="file-upload"
            type="file"
            name="image"
            onChange={handleFileChange}
          />

          <input
            type="text"
            placeholder="Photo name..."
            value={photoName}
            onChange={(e) => setPhotoName(e.target.value)}
          />

          {previewUrl && <C.PreviewImage src={previewUrl} alt="Preview" />}

          <button type="submit" disabled={!previewUrl || uploading}>
            {uploading ? <C.LoadingSpinner /> : "Send"}
          </button>
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
