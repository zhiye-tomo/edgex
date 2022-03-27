import styles from "../../styles/components/Navigation.module.scss";

export const Navigation: React.FC = () => {
  return (
    <nav>
      <ul className={styles.lists}>
        <li className={styles.li}>list1</li>
        <li className={styles.li}>list2</li>
        <li className={styles.li}>list3</li>
        <li className={styles.li}>list4</li>
        <li className={styles.li}>list5</li>
      </ul>
    </nav>
  );
};
