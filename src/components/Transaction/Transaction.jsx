import React, { useEffect } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import "./Tran.css";
import { Button } from "react-bootstrap";
import i from "../../assets/thanks.png"


export default function Transaction() {
  const navigate = useNavigate();


  const transact = "success";

  useEffect(() => {
    if (transact === "success") {
      swal({
        title: `Succesfully transaction`,
        icon: "success",
      });
      if (transact === "fail") {
        swal({
          title: `Failed transaction`,
          icon: "error",
        });
      }
    }
  }, []);

  return (
    <div>

      {!transact ? (
        <h1>Loading</h1>
        ) : (
          <div className="container1" >
          <div>
            <div className="container_buttons">
              <br />
              <br />
              <Button className="butt" onClick={() => navigate("/home")}>
                Home
              </Button>
              <Button
                className="butt"
                onClick={() => navigate("/profile/history")}
              >
                Buy History
              </Button>
            </div>
          </div>
        </div>
      )}
          <img className="img" src= {i}>

          </img>
    </div>
  );
}
