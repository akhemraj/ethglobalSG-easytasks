import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

const Header = () => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e7eef3] px-10 py-3">
      <div className="flex items-center gap-4 text-[#0d161b]">
        <div className="size-4">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <h2 className="text-[#0d161b] text-lg font-bold leading-tight tracking-[-0.015em]">
          EasyTasks
        </h2>
      </div>
      <div className="flex flex-1 justify-end gap-8 mr-6">
        <div className="flex items-center gap-9">
          <a
            className="text-[#0d161b] text-sm font-medium leading-normal"
            href="#"
          >
            Home
          </a>
          <a
            className="text-[#0d161b] text-sm font-medium leading-normal"
            href="/dashboard"
          >
            Browse tasks
          </a>
          <a
            className="text-[#0d161b] text-sm font-medium leading-normal"
            href="#"
          >
            Post a task
          </a>
          <a
            className="text-[#0d161b] text-sm font-medium leading-normal"
            href="#"
          >
            Earn money
          </a>
          <a
            className="text-[#0d161b] text-sm font-medium leading-normal"
            href="#"
          >
            Help
          </a>
        </div>
      </div>
      <DynamicWidget />
    </header>
  );
};

export default Header;
