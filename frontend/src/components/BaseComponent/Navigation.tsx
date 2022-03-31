import styles from "../../styles/components/Navigation.module.scss";

type Nav = {
  name: string;
  link: string;
};

export const Navigation: React.FC = () => {
  const navs: Array<Nav> = [
    { name: "Top", link: "xxx" },
    { name: "Search", link: "xxx" },
    { name: "New", link: "xxx" },
    { name: "XXX", link: "xxx" },
    { name: "Me", link: "xxx" },
  ];
  return (
    <nav>
      <ul className={styles.lists}>
        {navs.map((nav: Nav, key: number) => {
          return (
            <li className={styles.li} key={key}>
              <a className={styles.link}>{nav.name}</a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
