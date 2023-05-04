import { Provider } from "react-redux";

import GStyles from "./config/GlobalStyles";
import AppRoutes from "./routes/AppRoutes";
import { store } from "./shared/store";

function App() {
    return (
        <>
            <Provider store={store}>
                <GStyles />
                <AppRoutes />
            </Provider>
        </>
    );
}

export default App;
