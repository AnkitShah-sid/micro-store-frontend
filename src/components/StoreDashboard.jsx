import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/css/storeDashboard.css";

const StoreDashboard = () => {
  const [userRfId, setUserRfId] = useState("");
  const [userItems, setUserItems] = useState([]);
  const [userVendors, setUserVendors] = useState([]);
  const [userButchery, setUserButchery] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("Item");
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchUserRfId = async () => {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("No authentication token found. Please log in.");
        window.location.href = "/login";
        return;
      }

      try {
        const response = await axios.get("http://192.168.124.69:8080/userid", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserRfId(response.data || "");
      } catch (error) {
        console.error("Error fetching userRfId:", error);
        setError("Failed to fetch user ID. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserRfId();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userRfId) {
          const itemsResponse = await axios.get(`http://localhost:8080/item/${userRfId}`);
          console.log("Items Response:", itemsResponse.data);  // Check this log
          setUserItems(itemsResponse.data);
          const vendorsResponse = await axios.get(`http://localhost:8080/vendor/${userRfId}`);
          setUserVendors(vendorsResponse.data);
          const butcheryResponse = await axios.get(`http://localhost:8080/butchery/${userRfId}`);
          setUserButchery(butcheryResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again.");
      }
    };
  
    fetchData();
  }, [userRfId]);
  

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setSelectedItem(null); // Reset item details when switching tabs
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Item":
        return (
          <div className="item-list-container">
            {userItems && userItems.length > 0 ? (
              userItems.map((item) => (
                <div key={item.id} className="item" onClick={() => handleItemClick(item)}>
                  <h5>{item.itemName}</h5>
                  <p>Quantity: {item.totalQuantity}</p>
                </div>
              ))
            ) : (
              <div className="no-items">No items available</div>
            )}
          </div>
        );
      case "Vendor":
        return (
          <div className="item-list-container">
            {userVendors.length > 0 ? (
              userVendors.map((vendor) => (
                <div key={vendor.id} className="item">
                  <h5>{vendor.vendorName}</h5>
                  <p>Location: {vendor.vendorLocation}</p>
                </div>
              ))
            ) : (
              <div className="no-items">No vendors available</div>
            )}
          </div>
        );
      case "Butchery":
        return (
          <div className="item-list-container">
            {userButchery.length > 0 ? (
              userButchery.map((butcher) => (
                <div key={butcher.id} className="item">
                  <h5>{butcher.itemName}</h5>
                  <p>Quantity: {butcher.totalQuantity}</p>
                </div>
              ))
            ) : (
              <div className="no-items">No butchery items available</div>
            )}
          </div>
        );
      default:
        return null;
    }
};


  return (
    <main className="container">
      <div className="section-tabs">
        <div
          className={`section-tab ${activeTab === "Item" ? "active" : ""}`}
          onClick={() => handleTabClick("Item")}
        >
          Items
        </div>
        <div
          className={`section-tab ${activeTab === "Vendor" ? "active" : ""}`}
          onClick={() => handleTabClick("Vendor")}
        >
          Vendors
        </div>
        <div
          className={`section-tab ${activeTab === "Butchery" ? "active" : ""}`}
          onClick={() => handleTabClick("Butchery")}
        >
          Butchery
        </div>
      </div>

      <div className="main-content">
        <div className="container">
          <div className="content-left">{renderContent()}</div>
          <div className="content-right">
            <div
              className={`item-details-container ${selectedItem ? "active" : ""}`}
            >
              {selectedItem ? (
                <>
                  <h5>{selectedItem.itemName}</h5>
                  <p>Quantity: {selectedItem.totalQuantity}</p>
                  <p>Unit Type: {selectedItem.unitType}</p>
                </>
              ) : (
                <p>Select an item to view details</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default StoreDashboard;
