/* -------- SELLER LOGIN -------- */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f7f9fc;
  font-family: 'Segoe UI', Tahoma, sans-serif;
  padding: 20px;
}

.login-box {
  background: #fff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 420px;
}

.welcome-text {
  margin-bottom: 6px;
  font-size: 28px;
  color: #333;
  font-weight: bold;
}

.sub-text {
  margin-bottom: 20px;
  font-size: 14px;
  color: #666;
}

.login-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  font-size: 20px;
  color: #333;
  flex-wrap: wrap;
}

.register-btn {
  background: none;
  border: none;
  color: #ff9800;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  margin-top: 10px;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.login-form label {
  margin-bottom: 6px;
  font-size: 14px;
  color: #333;
}

.login-form input {
  padding: 10px 12px;
  margin-bottom: 18px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
}

.login-form input:focus {
  border-color: #00bcd4;
}

.login-btn {
  background: #00bcd4;
  color: #fff;
  padding: 12px 0;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
  width: 100%;
}

.login-btn:hover {
  background: #00acc1;
}

.terms-text {
  margin-top: 15px;
  font-size: 12px;
  color: #888;
  text-align: center;
}

.terms-text a {
  color: #00bcd4;
  text-decoration: none;
}

.terms-text a:hover {
  text-decoration: underline;
}

/* -------- REGISTRATION -------- */
.registration-container {
  background-color: white;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 15px;
}

.registration-box {
  background-color: #ffffff;
  box-shadow: 0 6px 20px rgba(0, 188, 212, 0.1);
  padding: 40px 25px;
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
}

.registration-title {
  text-align: center;
  color: black;
  font-size: 24px;
  margin-bottom: 25px;
  font-weight: bold;
}

.registration-form input,
.registration-form input[type="file"],
.registration-form select,
.registration-form .styled-input {
  width: 100%;
  padding: 12px 14px;
  margin-bottom: 15px;
  font-size: 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
  background-color: white;
  color: #333;
  font-family: inherit;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 15px;
}

.form-row input,
.form-row select {
  flex: 1 1 100%;
  min-width: 0;
}

.upload-label {
  font-size: 14px;
  margin-bottom: 6px;
  display: block;
}

.register-btn {
  width: 100%;
  padding: 12px;
  background-color: #ffc107;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
}

.register-btn:hover {
  background-color: #e0a800;
}

/* -------- PENDING VERIFICATION -------- */
.pending-verification {
  background-color: white;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.verification-box {
  text-align: center;
  background-color: white;
  padding: 40px 25px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 188, 212, 0.2);
  width: 100%;
  max-width: 480px;
}

.spinner {
  width: 22px;
  height: 22px;
  border: 3px solid #00bcd4;
  border-top: 3px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px auto;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.verification-box h2 {
  color: #00bcd4;
  font-size: 24px;
  margin-bottom: 10px;
}

.verification-box p {
  color: #444;
  font-size: 16px;
  margin: 6px 0;
}

.highlight-warning {
  color: #ff9800;
  font-weight: 500;
}

.email-note {
  margin-top: 15px;
  font-style: italic;
  color: #555;
}

/* -------- RESPONSIVENESS -------- */
@media (max-width: 768px) {
  .login-box,
  .registration-box,
  .verification-box {
    padding: 30px 20px;
  }

  .form-row {
    flex-direction: column;
  }

  .welcome-text {
    font-size: 24px;
  }

  .registration-title,
  .verification-box h2 {
    font-size: 20px;
  }

  .login-btn,
  .register-btn {
    font-size: 15px;
    padding: 10px;
  }
}

@media (max-width: 480px) {
  .login-container,
  .registration-container,
  .pending-verification {
    padding: 15px;
  }

  .login-box,
  .registration-box,
  .verification-box {
    padding: 25px 15px;
    border-radius: 8px;
  }

  .welcome-text {
    font-size: 20px;
  }

  .sub-text {
    font-size: 13px;
  }

  .login-title {
    font-size: 16px;
    flex-direction: column;
    align-items: flex-start;
  }

  .login-btn,
  .register-btn {
    font-size: 14px;
    padding: 10px;
  }
}

/* seller dashboard  */

/* Container layout */
.dashboard-container {
  display: flex;
  min-height: 100vh;
  font-family: 'Segoe UI', sans-serif;
  color: #000;
  background-color: #f9f9f9;
}

/* Sidebar */
.sidebar {
  width: 240px; /* same as admin-sidebar */
  background-color: #00bcd4;
  padding: 24px 20px;
  position: sticky;
  top: 0;
  height: 100vh;
  color: white;
  font-family: 'Segoe UI', sans-serif;
  box-shadow: 2px 0 12px rgba(0, 0, 0, 0.1);
  transition: background 0.4s ease;
}

/* Sidebar Title */
.sidebar h3 {
  font-size: 24px;
  color: white;
  margin-bottom: 30px;
  padding-left: 8px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

/* List Container */
.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* List Items */
.sidebar li {
  display: block;
  background: white;
  color: #00bcd4;
  font-weight: 600;
  padding: 12px 16px;
  margin-bottom: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s ease;
  border: none;
  font-size: 15px;
  text-align: left;
}

/* Hover Effects */
.sidebar li:hover {
  background-color: #e0f7fa;
  color: #007c91;
  transform: translateX(4px);
  font-weight: 700;
  box-shadow: 2px 2px 10px rgba(0, 188, 212, 0.2);
}

/* Active State */
.sidebar li.active {
  background-color: #00838f;
  color: white;
  font-weight: 700;
  border: 1px solid #00acc1;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.08);
}


/* Main content */
.main-content {
  flex-grow: 1;
  padding: 30px;
  overflow-y: auto;
}

.header h1 {
  font-size: 32px; /* Slightly bigger for modern feel */
  font-weight: 700; /* Bolder but not too heavy */
  color: #1a1a1a; /* Deeper black with modern tone */
  margin-bottom: 24px;
  font-family: 'Segoe UI', 'Helvetica Neue', sans-serif; /* Modern, clean font stack */
  letter-spacing: 0.5px;
}


/* Stats Grid */
.stats-grid {
  display: flex;
  gap: 20px;
  margin-top: 30px;
  flex-wrap: wrap;
}

/* Stat Cards */
.stat-card {
  flex: 1;
  min-width: 200px;
  background: linear-gradient(to bottom, #e0f7fa, #f2fcfd);
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 6px 16px rgba(0, 188, 212, 0.1);
  text-align: center;
  border: 2px solid #00bcd4;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 188, 212, 0.2);
}

.stat-card h3 {
  margin-bottom: 12px;
  font-size: 18px;
  color: #00bcd4;
  font-weight: 600;
}

.stat-card p {
  font-size: 28px;
  font-weight: 700;
  color: #333;
}

/* Charts Grid */
.charts-grid {
  display: flex;
  gap: 20px;
  margin-top: 40px;
  flex-wrap: wrap;
}

/* Chart Cards */
.chart-card {
  flex: 1;
  min-width: 280px;
  background: linear-gradient(to bottom,  #e0f7fa, #f0feff);
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 6px 16px rgba(0, 188, 212, 0.1);
  border: 2px solid #00bcd4;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.chart-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 188, 212, 0.2);
}

.chart-card h3 {
  margin-bottom: 15px;
  font-size: 20px;
  color: #00bcd4;
  font-weight: 600;
}





/* -------------------- */
/* Global Responsiveness */
/* -------------------- */

@media (max-width: 1024px) {
  .dashboard-container {
 