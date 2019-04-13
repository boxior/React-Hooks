import Loadable from "react-loadable";

export default Loadable({
    loader: () => import(`./src/components/Header/Search/index`),
    loading: () => null
});