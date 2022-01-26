import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

function App() {
  const [selectImage, setSelectImage] = useState(null);
  const [img1, setimg] = useState(null);
  const [state, setState] = useState({ email: "", password: "" });
  const [cookie, setCookies] = useCookies(["token", "userid"]);

  // eslint-disable-next-line no-unused-vars
  const handleChange = (event) => {
    console.log(event.target.files[0]);
    setSelectImage(event.target.files[0]);
  };

  const onFileUpload = (e) => {
    e.preventDefault();
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append("myFile", selectImage, cookie.userid + ".png");

    // Details of the uploaded file
    console.log(formData);
    console.log(formData.get("myFile"));

    // Request made to the backend api
    // Send formData object
    try {
      const res = axios.post("http://[::1]:3000/files", formData);
    } catch (err) {
      console.log("Error" + err);
    }
    // ****
    console.log("uploaded");
  };

  // Login
  const login = async () => {
    const { email, password } = state;
    let res = 0;
    var data = JSON.stringify({
      email: email,
      password: password,
    });

    var config = {
      method: "post",
      url: "http://[::1]:3000/users/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      res = await axios(config);
    } catch (err) {
      console.log(err);
    }
    if (res.status === 200) {
      console.log("Login successfully");
      setTimeout(() => {
        console.log("Timeout");
        setCookies("token", res.data.token);
        setCookies("userid", res.data.id);
      }, 2000);
    } else {
      console.log("login failed");
    }
  };

  // form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  //form Handling
  function handleChange1(e) {
    const name = e.target.name;
    const value = e.target.value;
    setState((values) => ({ ...values, [name]: value }));
  }

  useEffect(() => {
    async function fetchdata() {
      try {
        const res = await fetch(
          `http://[::1]:3000/files/${cookie.userid}.png`,
          {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
              "Content-Type": "image/png",
            },
          }
        );
        const blob = await res.blob();
        setimg(URL.createObjectURL(blob));
      } catch (err) {
        console.log(err);
      }
    }
    fetchdata();
  }, []);

  return (
    <div className="App">
      <form onSubmit={(e) => onFileUpload(e)}>
        <label>Image Uploading</label>
        <input type="file" onChange={(e) => handleChange(e)} />
        <input type="submit" value="submit" />
        {img1 && (
          <>
            <h1>Fetched Image</h1>
            {console.log(img1)}
            <img alt="not found" width={"250px"} src={img1} />
          </>
        )}
        {selectImage && (
          <>
            <h1>Uploaded Image</h1>
            <img
              alt="not fount"
              width={"250px"}
              src={URL.createObjectURL(selectImage)}
            />
          </>
        )}
      </form>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="Input">
          <label className="Label"></label>
          <input
            name="email"
            type="email"
            className="InputElement"
            placeholder="E-mail Address"
            onChange={(e) => {
              handleChange1(e);
            }}
            value={state.email}
          />
        </div>
        <div className="Input">
          <label className="Label"></label>
          <input
            name="password"
            type="password"
            className="InputElement"
            placeholder="Password"
            onChange={(e) => {
              handleChange1(e);
            }}
            value={state.password}
          />
        </div>
        <button className="Button Success">SUBMIT</button>
      </form>
    </div>
  );
}

export default App;