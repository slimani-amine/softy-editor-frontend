import classes from './Spinner.module.scss';

const Spinner = () => (
  <div
    className={`${classes.loader} dark:border-l-white dark:border-r-["#ffffff33"] dark:border-t-["#ffffff33"] dark:border-b-["#ffffff33"]  `}
  />
);

export default Spinner;
