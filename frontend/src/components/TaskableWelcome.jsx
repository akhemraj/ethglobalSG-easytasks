import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import axios from "axios";
import TaskifyProfile from "./TaskifyProfile";
import Dashboard from "./dashboard";

const TaskableWelcome = () => {
  const navigate = useNavigate();
  const { user } = useDynamicContext();

  // Call API if user is logged in
  const checkUser = async (user) => {
    console.log("CALLING FUNCTION", user);
    const authToken = localStorage.getItem("dynamic_authentication_token");
    console.log("sending token to backend", authToken);

    const response = await axios.post(
      "https://ethglobalsg-easytasks-be-5b1fa77ae872.herokuapp.com/api/signUpOrSignIn",
      {
        token: authToken, // Send proof in request body
        // Send email in request body
      }
    );

    if (response.status === 200) {
      console.log("RESPONSE1231231233:", response);

      localStorage.setItem("email", response.data.email);

      const { isNewUser } = response.data.isNewUser;
      if (isNewUser === true) {
        // If user does not have a profile: /profile
        navigate("/profile");
      } else if (response.data.isVerified) {
        // If user has profile and verfied: /dashboard
        navigate("/dashboard");
      } else {
        // If user has profile but not verified: /verify
        navigate("/verify");
      }
    } else {
      console.log("error occurred while calling api");
    }
  };

  if (user !== null && typeof user !== "undefined") {
    checkUser(user);
  }

  // Show dashboard if user is logged in via Dynamic
  return (
    <>
      {user ? (
        <Dashboard />
      ) : (
        <Layout>
          <div
            className="relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden"
            style={{
              "--radio-dot-svg":
                "url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27rgb(32,156,238)%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3ccircle cx=%278%27 cy=%278%27 r=%273%27/%3e%3c/svg%3e')",
              fontFamily: "Manrope, 'Noto Sans', sans-serif",
            }}
          >
            <div />

            <div className="layout-container flex h-full flex-col content-center	">
              <div className="@container">
                <div className="@[480px]:px-4 @[480px]:py-3">
                  <div
                    className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-slate-50 @[480px]:rounded-xl min-h-[218px]"
                    style={{
                      backgroundImage:
                        "url('https://cdn.usegalileo.ai/stability/3a4fa6b4-e090-4a48-8d12-ebc0833a4902.png')",
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="layout-container flex h-full grow flex-col content-center">
              <div className="px-40 flex flex-1 justify-center py-5">
                <div className="layout-content-container items-center flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
                  <h1 className="text-[#0d161b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 text-center pb-3 pt-5">
                    Welcome to EasyTasks!
                  </h1>
                  <p className="text-[#0d161b] text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">
                    Taskable is a platform for people to help each other by
                    sharing tasks and earning money. Which of the following best
                    describes you?
                  </p>
                  <div>
                    <DynamicWidget class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

export default TaskableWelcome;
