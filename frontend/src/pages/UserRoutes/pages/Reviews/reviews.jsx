import "../../sidebar.css";
import "./reviews.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ComputerIcon from "@mui/icons-material/Computer";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ReviewsIcon from "@mui/icons-material/Reviews";
import LogoutIcon from "@mui/icons-material/Logout";
import VideocamIcon from "@mui/icons-material/Videocam";
import { useState, useEffect } from "react";

function Reviews() {
  return (
    <div className="flex">
      <div className="user-sidebar flex column padding-20 gap-20">
        <div className="landing-nav-logo flex center bottom-border padding-10">
          <img className="logo " src="/images/Investify.png" alt="logo"></img>
        </div>
        <div className="user-sidebar-navigations flex column gap-10 ">
          <div
            className="flex gap-10 user-sidebar-navigation align "
            onClick={() => {
              navigate("/user/home");
            }}
          >
            <HomeIcon />
            <h3>Home</h3>
          </div>
          <div
            className="flex gap-10 user-sidebar-navigation align"
            onClick={() => {
              navigate("/user/reviews");
            }}
          >
            <ReviewsIcon />
            <h3>Reviews</h3>
          </div>
          <div
            className="flex gap-10 user-sidebar-navigation align"
            onClick={() => {
              navigate("/user/chat_bot");
            }}
          >
            <ComputerIcon />
            <h3>AI</h3>
          </div>
          <div
            className="flex gap-10 user-sidebar-navigation align page-shown"
            onClick={() => {}}
          >
            <EventAvailableIcon />
            <h3>Schedule</h3>
          </div>
          <div
            className="flex gap-10 user-sidebar-navigation align "
            onClick={() => {
              navigate("/user/video");
            }}
          >
            <VideocamIcon />
            <h3>Video Chat</h3>
          </div>
        </div>
        <div className="user-sidebar-logout flex between align">
          <h3>Logout</h3>
          <LogoutIcon
            className="logout-icon"
            onClick={() => {
              logout();
            }}
          />
        </div>
      </div>
    </div>
  );
}
export default Reviews;
