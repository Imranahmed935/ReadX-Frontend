import { Outlet } from "react-router-dom";
import CommonLayout from "./components/layouts/CommonLayout";

export default function App() {
  return (
    <div>
      <CommonLayout>
        <main>
          <Outlet />
        </main>
      </CommonLayout>
    </div>
  );
}
