import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AboutPage() {
    const navigate = useNavigate();

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Household Budget Tracker</h1>
            <p>
                This app is a simple household budget tracker designed to help you manage shared expenses with roommates or family members. It allows you to add people and track their contributions to groceries or other utitlites. You can also log transactions to keep a record of who paid for what and how much. The main goal of this app is to make it easier to split bills and keep track of shared expenses in a transparent way. This tool is designed to simplify this issue into a basic interactive web application that combines budget tracking tools with both a wishlist feature and a financial summary that allows for easy planning and executing of financial decisions across a household.
            </p>
            <button onClick={() => navigate(-1)} style={{
              marginTop: "20px",
              padding: "8px 16px",
              backgroundColor: "gray",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px"
            }}>
                Back
            </button>
        </div>
    );
}