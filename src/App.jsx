import { ToastContainer } from "react-toastify";
import RouteProvider from "./routes/RouteProvider";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <RouteProvider />
      </QueryClientProvider>
    </>
  );
}

export default App;
