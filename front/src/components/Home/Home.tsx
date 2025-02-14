import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./Home.css";
import Card from "../Card/Card";
import { BiSolidSushi } from "react-icons/bi";
import { FaPizzaSlice, FaHamburger, FaIceCream, FaHeart } from "react-icons/fa";
import { GiChickenOven, GiTacos } from "react-icons/gi";
import { LuSandwich } from "react-icons/lu";
import { RiDrinks2Fill } from "react-icons/ri";
import { UserModel } from "../../models/User.model";

type Category = 'Asiatique' | 'Pizza' | 'Poulet' | 'Sandwich' | 'Mexicain' | 'Burger' | 'Glaces' | 'Boissons';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null); // Update to Category type
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserModel[]>([]);

  const handleCategoryClick = (category: Category) => {
    setActiveCategory(category);
    navigate(`/browse/${category}`);
  };

  const getGenderSubcategory = (preferredGender: string) => {
    switch (preferredGender) {
      case "both":
        return (
          <>
            H & F
          </>
        );
      case "homme":
        return (
          <>
            Hommes
          </>
        );
      case "femme":
        return (
          <>
            Femmes
          </>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.REACT_APP_API_URL}/auth/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          console.error(data.message);
        } else {
          setUsers(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  return (
    <div className="div">
      <div>
        <div>
          <p className="p1-home">Let's eat together</p>
          <p className="p2-home">Mangeons ensemble</p>
        </div>
        <div className="category">
          <p className="p3-home">Catégories de restaurant</p>
          <div className="parent">
            <div className={`div1 ${activeCategory === 'Asiatique' ? 'active' : ''}`} onClick={() => handleCategoryClick('Asiatique')}>
              <div className="circle">
                <BiSolidSushi className="icon-category" />
              </div>
              <p className={`p-category ${activeCategory === 'Asiatique' ? 'active' : ''}`}>Asiatique</p>
            </div>
            <div className={`div2 ${activeCategory === 'Pizza' ? 'active' : ''}`} onClick={() => handleCategoryClick('Pizza')}>
              <div className="circle">
                <FaPizzaSlice className="icon-category" />
              </div>
              <p className={`p-category ${activeCategory === 'Pizza' ? 'active' : ''}`}>Pizza</p>
            </div>
            <div className={`div3 ${activeCategory === 'Poulet' ? 'active' : ''}`} onClick={() => handleCategoryClick('Poulet')}>
              <div className="circle">
                <GiChickenOven className="icon-category" />
              </div>
              <p className={`p-category ${activeCategory === 'Poulet' ? 'active' : ''}`}>Poulet</p>
            </div>
            <div className={`div4 ${activeCategory === 'Sandwich' ? 'active' : ''}`} onClick={() => handleCategoryClick('Sandwich')}>
              <div className="circle">
                <LuSandwich className="icon-category" />
              </div>
              <p className={`p-category ${activeCategory === 'Sandwich' ? 'active' : ''}`}>Sandwich</p>
            </div>
            <div className={`div5 ${activeCategory === 'Mexicain' ? 'active' : ''}`} onClick={() => handleCategoryClick('Mexicain')}>
              <div className="circle">
                <GiTacos className="icon-category" />
              </div>
              <p className={`p-category ${activeCategory === 'Mexicain' ? 'active' : ''}`}>Mexicain</p>
            </div>
            <div className={`div6 ${activeCategory === 'Burger' ? 'active' : ''}`} onClick={() => handleCategoryClick('Burger')}>
              <div className="circle">
                <FaHamburger className="icon-category" />
              </div>
              <p className={`p-category ${activeCategory === 'Burger' ? 'active' : ''}`}>Burger</p>
            </div>
            <div className={`div7 ${activeCategory === 'Glaces' ? 'active' : ''}`} onClick={() => handleCategoryClick('Glaces')}>
              <div className="circle">
                <FaIceCream className="icon-category" />
              </div>
              <p className={`p-category ${activeCategory === 'Glaces' ? 'active' : ''}`}>Glaces</p>
            </div>
            <div className={`div8 ${activeCategory === 'Boissons' ? 'active' : ''}`} onClick={() => handleCategoryClick('Boissons')}>
              <div className="circle">
                <RiDrinks2Fill className="icon-category" />
              </div>
              <p className={`p-category ${activeCategory === 'Boissons' ? 'active' : ''}`}>Boissons</p>
            </div>
          </div>
        </div>
        <div className="div-card">
          {users.map((user) => (
            <Card
              key={user._id}
              category={user.favoriteCategory as Category}
              subcategory={<><FaHeart className="icon-title icon-heart-home" /> {getGenderSubcategory(user.preferredGender)}</>}
              image={user.image || "https://architecture.ou.edu/wp-content/uploads/2018/07/ANGELAPERSON-1447-300x300.jpg"} // Default image if not available
              text={`${user.firstname}, ${user.age} ans`}
              job={user.job}
              id={user._id}
            />
          ))}
        </div>
      </div>
      <div className="div-match">
        <p className="p-match">Mes matchs</p>
        <div className="parent">
          {/* Match images */}
          <div className="div1">
            <div className="circle">
              <img
                className="image-match"
                src="https://architecture.ou.edu/wp-content/uploads/2018/07/ANGELAPERSON-1447-300x300.jpg"
                alt="match-person"
              />
            </div>
          </div>
          <div className="div2">
            <div className="circle">
              <img
                className="image-match"
                src="https://architecture.ou.edu/wp-content/uploads/2018/07/ANGELAPERSON-1447-300x300.jpg"
                alt="match-person"
              />
            </div>
          </div>
          <div className="div3">
            <div className="circle">
              <img
                className="image-match"
                src="https://architecture.ou.edu/wp-content/uploads/2018/07/ANGELAPERSON-1447-300x300.jpg"
                alt="match-person"
              />
            </div>
          </div>
          <div className="div4">
            <div className="circle">
              <img
                className="image-match"
                src="https://architecture.ou.edu/wp-content/uploads/2018/07/ANGELAPERSON-1447-300x300.jpg"
                alt="match-person"
              />
            </div>
          </div>
          <div className="div5">
            <div className="circle">
              <img
                className="image-match"
                src="https://architecture.ou.edu/wp-content/uploads/2018/07/ANGELAPERSON-1447-300x300.jpg"
                alt="match-person"
              />
            </div>
          </div>
          <div className="div6">
            <div className="circle">
              <img
                className="image-match"
                src="https://architecture.ou.edu/wp-content/uploads/2018/07/ANGELAPERSON-1447-300x300.jpg"
                alt="match-person"
              />
            </div>
          </div>
          <div className="div7">
            <div className="circle">
              <img
                className="image-match"
                src="https://architecture.ou.edu/wp-content/uploads/2018/07/ANGELAPERSON-1447-300x300.jpg"
                alt="match-person"
              />
            </div>
          </div>
          <div className="div8">
            <div className="circle">
              <img
                className="image-match"
                src="https://architecture.ou.edu/wp-content/uploads/2018/07/ANGELAPERSON-1447-300x300.jpg"
                alt="match-person"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
