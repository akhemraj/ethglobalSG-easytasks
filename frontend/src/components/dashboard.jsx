import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

const Dashboard = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskType, setTaskType] = useState("");
  const [budget, setBudget] = useState("");

  // Handling form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    console.log("Title: ", title);
    console.log("Description: ", description);
    console.log("Task Type: ", taskType);
    console.log("Budget: ", budget);
  };

  return (
    <Layout>
      <div className="relative flex size-md min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden font-['Manrope','Noto_Sans',sans-serif]">
        <div className="layout-container flex h-full grow flex-col items-center">
          <h2 class="text-lg font-semibold my-3">Create</h2>
          <form class="w-full max-w-lg flex flex-col items-center">
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-title"
                >
                  Title
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-title"
                  type="text"
                  placeholder=""
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <p class="text-red-500 text-xs italic">
                  Please fill out this field.
                </p>
              </div>
              <div class="w-full md:w-md px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-description"
                >
                  Description
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-description"
                  type="text"
                  placeholder=""
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-2 items-center flex-col">
              <div class="w-full md:w-md mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-type"
                >
                  Type
                </label>
                <input
                  className="mx-2"
                  id="online-option"
                  type="radio"
                  name="options"
                  value="1"
                  onChange={(e) => setTaskType(e.target.value)}
                />
                <label className="ml-2 mr-5" for="online-option">
                  Online
                </label>
                <input
                  id="offline-option"
                  type="radio"
                  name="options"
                  value="0"
                  onChange={(e) => setTaskType(e.target.value)}
                />
                <label className="mx-2" for="offline-option">
                  Offline
                </label>
              </div>
              <div class="w-full md:w-md px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold my-2"
                  for="grid-number"
                >
                  Budget
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-number"
                  type="number"
                  placeholder=""
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Create Task
            </button>
          </form>

          <h2 class="text-lg font-semibold mt-6">Browse</h2>
          {/* Display list of tasks here */}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
