import { thema } from "@/common/thema";
import { Login } from "@/pages/Login";
import { Task } from "@/pages/Task";
import { store } from "@/redux/store";
import { ThemeProvider } from "@emotion/react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={thema}>
                <BrowserRouter>
                    <Routes>
                        <Route index element={<Login />} />
                        <Route path="/tasks" element={<Task />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    );
};

export default App;
