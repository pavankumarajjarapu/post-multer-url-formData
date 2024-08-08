import React, { useRef, useState } from "react";

function SignupForm() {
  let [imgpre, setimgpre] = useState("./images/dummyprofile.jpeg");
  let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let ageInputRef = useRef();
  let mailInputRef = useRef();
  let passwordInputRef = useRef();
  let MobileNumberInputRef = useRef();
  let profilePictureInputRef = useRef();

  let sendToServer = async () => {
    let dataToSendDB = {
      firstName: firstNameInputRef.current.value,
      lastName: lastNameInputRef.current.value,
      age: ageInputRef.current.value,
      mail: mailInputRef.current.value,
      password: passwordInputRef.current.value,
      MobileNumber: MobileNumberInputRef.current.value,
      profilePicture: profilePictureInputRef.current.value,
    };
    console.log(dataToSendDB);

    let JSONDataToSend = JSON.stringify(dataToSendDB);
    console.log(JSONDataToSend);

    let myHeader = new Headers();
    myHeader.append("content-type", "application/json");

    let reqOptions = {
      method: "POST",
      body: JSONDataToSend,
      headers: myHeader,
    };
    
    let JSONData = await fetch("http://localhost:2389/signup", reqOptions);
    let JSOData = await JSONData.json();
    console.log(JSOData);
  };

  // save to data base by using in url encoded format
  let saveToDataBaseByURLEncoded = async () => {
    let myHeader = new Headers();
    myHeader.append("content-type", "application/x-www-form-urlencoded");

    let dataToSendDB = new URLSearchParams();
    dataToSendDB.append("firstName", firstNameInputRef.current.value);
    dataToSendDB.append("lastName", lastNameInputRef.current.value);
    dataToSendDB.append("age", ageInputRef.current.value);
    dataToSendDB.append("mail", mailInputRef.current.value);
    dataToSendDB.append("password", passwordInputRef.current.value);
    dataToSendDB.append("mobilenumber", MobileNumberInputRef.current.value);
    dataToSendDB.append("profilePicture", profilePictureInputRef.current.value);

    let reqOptions = {
      method: "POST",
      headers: myHeader,
      body: dataToSendDB,
    };
    let JSONData = await fetch("http://localhost:2389/signup", reqOptions);
    let JSOData = await JSONData.json();
    console.log(JSOData);
  };
  // save to data base by using in url encoded format
  let saveToDataBaseByFormData = async () => {
    let dataToSendDB = new FormData();
    dataToSendDB.append("firstName", firstNameInputRef.current.value);
    dataToSendDB.append("lastName", lastNameInputRef.current.value);
    dataToSendDB.append("age", ageInputRef.current.value);
    dataToSendDB.append("mail", mailInputRef.current.value);
    dataToSendDB.append("password", passwordInputRef.current.value);
    dataToSendDB.append("mobilenumber", MobileNumberInputRef.current.value);
    for (let i = 0; i < profilePictureInputRef.current.files.length; i++) {
      dataToSendDB.append(
        "profilePicture",
        profilePictureInputRef.current.files[i]
      );
    }

    let reqOptions = {
      method: "POST",
      body: dataToSendDB,
    };
    let JSONData = await fetch("http://localhost:2389/signup", reqOptions);
    let JSOData = await JSONData.json();
    console.log(JSOData);
  };
  return (
    <div>
      <div>
        <form>
          <h1>SignupForm</h1>
          <div>
            <img src={imgpre} className="imgContainer"></img>
          </div>
          <div>
            <label>FirstName</label>
            <input ref={firstNameInputRef} type="text"></input>
          </div>
          <div>
            <label>LastName</label>
            <input ref={lastNameInputRef} type="text"></input>
          </div>
          <div>
            <label>Age</label>
            <input ref={ageInputRef} type="number"></input>
          </div>
          <div>
            <label>Mail</label>
            <input ref={mailInputRef} type="mail"></input>
          </div>
          <div>
            <label>Password</label>
            <input ref={passwordInputRef} type="password"></input>
          </div>
          <div>
            <label>MobileNumber</label>
            <input ref={MobileNumberInputRef} type="number"></input>
          </div>
          <div>
            <label>ProfilePicture</label>
            <input
              ref={profilePictureInputRef}
              type="file"
              accept="image/*"
              onChange={(eo) => {
                setimgpre(URL.createObjectURL(eo.target.files[0]));
                console.log(URL.createObjectURL(eo.target.files[0]));
                console.log(eo.target.files);
              }}
              className="imginput"
            ></input>
          </div>
          <button
            type="button"
            onClick={() => {
              sendToServer();
            }}
          >
            {" "}
            SignUp
          </button>
          <button
            type="button"
            onClick={() => {
              saveToDataBaseByURLEncoded();
            }}
          >
            {" "}
            BY-URL
          </button>
          <button
            type="button"
            onClick={() => {
              saveToDataBaseByFormData();
            }}
          >
            {" "}
            FORMDATA
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
