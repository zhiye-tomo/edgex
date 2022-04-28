import styles from "../../styles/components/Navigation.module.scss";
import Link from "next/link";

type Nav = {
  name: string;
  link: string;
};

export const Navigation: React.FC = () => {
  const navs: Array<Nav> = [
    { name: "Top", link: "/" },
    { name: "Search", link: "xxx" },
    { name: "Article", link: "xxx" },
    { name: "Group", link: "" },
    { name: "Tag", link: "/tag" },
    { name: "Me", link: "xxx" },
  ];
  return (
    <nav>
      <ul className={styles.lists}>
        {navs.map((nav: Nav, key: number) => {
          return (
            <li className={styles.li} key={key}>
              <Link href={nav.link}>
                <a className={styles.link}>{nav.name}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
