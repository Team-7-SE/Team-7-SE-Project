import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AboutPage() {
    const navigate = useNavigate();

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1>About</h1>
            <p>
                This is a simple about page with a header, some descriptive text, and a button to navigate back to the previous page.
            </p>
            <button onClick={() => navigate(-1)} style={{ marginTop: '2rem', padding: '0.5rem 1rem' }}>
                Back
            </button>
        </div>
    );
}