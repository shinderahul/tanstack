import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "./pages/home";
import { FetchRq } from "./pages/fetchRq";
import { InfiniteScroll } from "./pages/infiniteScroll";
import { Header } from "./components/header";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="fetchrq" element={<FetchRq />} />
          <Route path="infinite-scroll" element={<InfiniteScroll />} />
        </Routes>
      </BrowserRouter>
      <header />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
