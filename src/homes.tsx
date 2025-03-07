import React from "react";
import Topbar from "./topbars";
import "./App.css";

const homes: React.FC = () => {
  const crops = [
    { name: "Barley", emoji: "🌾", img: "https://cdn.britannica.com/31/75931-050-FED41F1F/Barley.jpg" },
    { name: "Cotton", emoji: "🧵", img: "https://www.longancraft.com/cdn/shop/articles/how-is-cotton-made-into-fabric-870x570.jpg?v=1723519238&width=800" },
    { name: "Corn", emoji: "🌽", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXlOAOQL1PlzR3wSyZuzAyejTh0T0Gdzw3NNbwl2Kpj3saD63xexaJ8EDzSpj2jHCg0ho&usqp=CAU" },
    { name: "Mustard", emoji: "🌿", img: "https://www.udayindia.in/assets/uploads/blogs/171324536814a.jpg" },
    { name: "Chickpea", emoji: "🥜", img: "https://www.naario.com/cdn/shop/articles/1678258897181.jpg?v=1722924808&width=1920" },
    { name: "Peanuts", emoji: "🥜", img: "https://media.istockphoto.com/id/1279529996/photo/fresh-peanuts-plants-with-roots.jpg?s=612x612&w=0&k=20&c=IUocTYpKwQalpwvrHd5WIdzKXZ4A5OXYgDSIxa5wx98=" },
    { name: "Rice", emoji: "🍚", img: "https://b1761949.smushcdn.com/1761949/wp-content/uploads/2023/01/rice-arroz-scaled.jpg?size=1920x1280&lossy=0&strip=1&webp=1" },
    { name: "Soybeans", emoji: "🌱", img: "https://cdn.britannica.com/30/174830-050-779DE460/Field-soybeans-farm-Oklahoma.jpg?w=300" },
    { name: "Sugarcane", emoji: "🍬", img: "https://www.mahagro.com/cdn/shop/articles/iStock_000063947343_Medium_4e1c882b-faf0-4487-b45b-c2b557d32442.jpg?v=1541408129" },
    { name: "Wheat", emoji: "🌾", img: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_835,h_428/https://www.peptechbio.com/wp-content/uploads/2023/03/Wheat_photo-cred-Adobe-stock_E-2-835x428.jpg" },
  ];

  return (
    <div>
      <Topbar />
      <div className="crop-image-layout">
        <img
          src="https://www.trenpa.in/cdn/shop/articles/artificial-intelligance-agriculture.webp?v=1735886109"
          alt="Agriculture AI Banner"
          className="crop-image-banner"
        />
        <h1 className="crop-image-title">Crop Image Layout</h1>
        <div className="crop-image-grid">
          {crops.map((crop, index) => (
            <figure key={index} className="crop-image-card">
              <img src={crop.img} alt={crop.name} />
              <figcaption className="crop-image-caption">{crop.emoji} {crop.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
};

export default homes;