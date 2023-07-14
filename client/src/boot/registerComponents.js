import Injector from 'lib/Injector';
import MultiSelectGrid from "../components/MultiSelectGrid";
import Filter from "../components/Filter";

export default () => {
  Injector.component.registerMany({
    MultiSelectGrid,
    Filter
  });
};
