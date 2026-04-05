import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

function App() {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetch("/output.json")
      .then(res => res.json())
      .then(data => {
        setData(data);
        setAllData(data);
      });
  }, []);

  const handleSearch = (value) => {
    setSearch(value);
    const filtered = allData.filter(item =>
      item.product.toLowerCase().includes(value.toLowerCase())
    );
    setData(filtered);
  };

  const sortLowToHigh = () => {
    const sorted = [...data].sort((a, b) => a.suggested_price - b.suggested_price);
    setData(sorted);
  };

  const sortHighToLow = () => {
    const sorted = [...data].sort((a, b) => b.suggested_price - a.suggested_price);
    setData(sorted);
  };

  return (
    <div style={{
      fontFamily: "Segoe UI, sans-serif",
      backgroundColor: "#ecf0f7",
      minHeight: "100vh",
      padding: "40px"
    }}>
      
      {/* HEADER */}
      <h1 style={{
        textAlign: "center",
        color: "#406093",
        marginBottom: "60px",
        fontWeight: "bolder",
        fontSize: "45px"
      }}>
        Dynamic Pricing Dashboard
      </h1>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        style={{
          padding: "12px",
          width: "50%",
          margin: "0 auto 20px auto",
          display: "block",
          borderRadius: "25px",
          border: "1px solid #ccc",
          outline: "none",
          fontSize: "18px"
        }}
      />

      {/* BUTTONS */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "20px",
        marginBottom: "30px"
      }}>
        {[
          { label: "All", action: () => setData(allData) },
          { label: "High Demand", action: () => setData(allData.filter(i => i.trend === "High Demand")) },
          { label: "Low Demand", action: () => setData(allData.filter(i => i.trend === "Low Demand")) },
          { label: "Price ↑", action: sortLowToHigh },
          { label: "Price ↓", action: sortHighToLow }
        ].map((btn, index) => (
          <button
            key={index}
            onClick={btn.action}
            style={{
              padding: "10px 18px",
              borderRadius: "20px",
              border: "none",
              backgroundColor: "#4C8CE4",
              color: "white",
              fontWeight: "500",
              cursor: "pointer",
              transition: "0.3s",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              fontSize: "18px"
            }}
            onMouseOver={e => e.target.style.backgroundColor = "#406093"}
            onMouseOut={e => e.target.style.backgroundColor = "#4C8CE4"}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "40px"
      }}>
        {data.map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "white",
              borderRadius: "15px",
              padding: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              transition: "0.3s"
            }}
            onMouseOver={e => e.currentTarget.style.transform = "scale(1.03)"}
            onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
          >

            <img
              src={item.image}
              alt={item.product}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "10px",
                marginBottom: "10px"
              }}
            />
            <h2 style={{ color: "#406093" }}>{item.product}</h2>

            <p>
              <b>Trend:</b>{" "}
              <span style={{
                color: item.trend === "High Demand" ? "#eb3b20" : "#285cb0"
              }}>
                {item.trend}
              </span>
            </p>

            <p><b>Price:</b> ₹{item.suggested_price}</p>

            <p>
              <b>Decision:</b>{" "}
              <span style={{
                backgroundColor:
                  item.decision === "Increase Price" ? "#91D06C" : "#FFF799",
                padding: "4px 10px",
                borderRadius: "10px",
                fontSize: "14px"
              }}>
                {item.decision}
              </span>
            </p>

            <button
              onClick={() => setSelectedItem(item)}>
              View Details
            </button>
          </div>
        ))}
      </div>
      {selectedItem && (
  <div style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }}>
    
    <div style={{
      backgroundColor: "white",
      padding: "25px",
      borderRadius: "15px",
      width: "400px",
      maxWidth: "90%"
    }}>

      <img
        src={selectedItem.image}
        alt={selectedItem.product}
        style={{
          width: "100%",
          borderRadius: "10px",
          marginBottom: "10px"
        }}
      />

      <h2>{selectedItem.product}</h2>
      <p><b>Trend:</b> {selectedItem.trend}</p>
      <p><b>Price:</b> ₹{selectedItem.suggested_price}</p>
      <p><b>Decision:</b> {selectedItem.decision}</p>

      <div style={{ width: "100%", height: "250px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
          data={(selectedItem.history || []).map((price, index) => ({              day: index + 1,
              price: price
            }))}
          >
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="price" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <button
        onClick={() => setSelectedItem(null)}
        style={{
          marginTop: "10px",
          padding: "10px",
          width: "100%",
          borderRadius: "10px",
          border: "none",
          backgroundColor: "#406093",
          color: "white"
        }}
      >
        Close
      </button>

    </div>
  </div>
)}
    </div>
  );
}

export default App;