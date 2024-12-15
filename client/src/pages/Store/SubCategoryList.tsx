import React from "react";
import { useNavigate } from "react-router-dom";

type SubCategoryProps = {
  mainCategory: string;
  subCategories: string[];
};

const SubCategoryList: React.FC<SubCategoryProps> = ({ mainCategory, subCategories }) => {
  const navigate = useNavigate();

  const handleClick = (subCategory: string) => {
    navigate(`/${mainCategory}/${subCategory}`);
  };

  return (
    <ul>
      {subCategories.map((sub) => (
        <li key={sub} onClick={() => handleClick(sub)} style={{ cursor: "pointer", color: "blue" }}>
          {sub}
        </li>
      ))}
    </ul>
  );
};

export default SubCategoryList;
