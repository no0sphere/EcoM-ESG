import React, { useState } from 'react';

function Contact() {
  const [email, setEmail] = useState('');

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    },
    header: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '10px'
    },
    subHeader: {
      fontSize: '16px',
      marginBottom: '20px'
    },
    input: {
      fontSize: '14px',
      padding: '10px',
      marginBottom: '10px',
      width: '300px'
    },
    submitButton: {
      fontSize: '14px',
      padding: '10px 20px',
      cursor: 'pointer',
      backgroundColor: 'black',
      color: 'white',
      border: 'none',
      borderRadius: '5px'
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Demo booked for: ${email}`);

  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Try Ours ESG Platform</h1>
      <p style={styles.subHeader}>Book a Demo</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email@ad.unsw.edu.au"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Contact;
