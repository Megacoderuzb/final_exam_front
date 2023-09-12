import "./sidebar.scss";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
const sidebarNavItems = [
  {
    display: "Profile",
    icon: <i className="bx bx-user"></i>,
    to: "/",
    section: "",
  },
  {
    display: "Users",
    icon: <i className="bx bx-star"></i>,
    to: "/users",
    section: "users",
  },
  {
    display: "Guide",
    icon: <i className="bx bx-receipt"></i>,
    to: "/guide",
    section: "guide",
  },
  {
    display: "Notification",
    icon: <i className="bx bx-receipt"></i>,
    to: "/notification",
    section: "notification",
  },
  {
    display: "Logout",
    icon: <i className="bx bxs-door-open"></i>,
    to: "/login",
    section: "login",
  },
];
const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [stepHeight, setStepHeight] = useState(0);
  const sidebarRef = useRef();
  const indicatorRef = useRef();
  const location = useLocation();
  useEffect(() => {
    setTimeout(() => {
      const sidebarItem = sidebarRef.current.querySelector(
        ".sidebar__menu__item"
      );
      indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
      setStepHeight(sidebarItem.clientHeight);
    }, 50);
  }, []);
  useEffect(() => {
    const curPath = window.location.pathname.split("/")[1];
    let activeItem = sidebarNavItems.findIndex(
      (item) => item.section === curPath
    );
    if (curPath == "notification") {
      setActiveIndex(role ? 3 : 2);
      return;
    }
    if (curPath == "guide") {
      setActiveIndex(role ? 2 : 1);
      return;
    }
    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location]);

  const role = localStorage.getItem("role");
  const filteredSidebarNavItems = sidebarNavItems.filter((item) => {
    return role || item.section !== "users";
  });

  return (
    <div className="sidebar">
      <div className="sidebar__logo">Mega Guides</div>
      <div ref={sidebarRef} className="sidebar__menu">
        <div
          ref={indicatorRef}
          className="sidebar__menu__indicator"
          style={{
            transform: `translateX(-50%) translateY(${
              activeIndex * stepHeight
            }px)`,
          }}
        ></div>
        {filteredSidebarNavItems.map((item, index) => (
          <Link
            to={item.to}
            key={index}
            onClick={() => {
              if (item.to === "/login") {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
              }
            }}
          >
            <div
              className={`sidebar__menu__item ${
                activeIndex === index ? "active" : ""
              }`}
            >
              <div className="sidebar__menu__item__icon">{item.icon}</div>
              <div className="sidebar__menu__item__text">{item.display}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Sidebar;
