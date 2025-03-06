import { motion } from "framer-motion";
import { Mail, MapPin, Leaf, Sprout, CloudRain, Wheat, TestTube } from "lucide-react";
import "./App.css";

const Profile = () => {
  return (
    <div className="profile-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="profile-content"
      >
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            <img
              src="https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
              alt="Farmer Profile"
            />
          </div>
          <h1 className="profile-name">James Wilson</h1>
          <p className="profile-role">Organic Farmer</p>
          <div className="profile-location">
            <MapPin className="icon-small" />
            <span>Sacramento Valley, CA</span>
          </div>
        </div>

        {/* Farm Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <Wheat className="stat-icon icon-amber" />
            <div className="stat-value">42 acres</div>
            <div className="stat-label">Farm Area</div>
          </div>
          <div className="stat-card">
            <Sprout className="stat-icon icon-green" />
            <div className="stat-value">8 varieties</div>
            <div className="stat-label">Crops</div>
          </div>
          <div className="stat-card">
            <TestTube className="stat-icon icon-blue" />
            <div className="stat-value">24 reports</div>
            <div className="stat-label">Soil Tests</div>
          </div>
        </div>

        {/* Farm Bio */}
        <div className="profile-card">
          <h2 className="card-title">
            <Leaf className="icon-small" />
            About My Farm
          </h2>
          <p className="card-text">
            I manage a mid-sized organic farm in the Sacramento Valley, specializing in sustainable 
            farming practices. Our main crops include tomatoes, lettuce, corn, and various berries. 
            I've been implementing precision agriculture techniques to optimize fertilizer usage 
            and improve crop yields while minimizing environmental impact.
          </p>
        </div>

        {/* Current Recommendations */}
        <div className="profile-card">
          <h2 className="card-title">
            <CloudRain className="icon-small" />
            Current Recommendations
          </h2>
          <div className="recommendations">
            <div className="recommendation green">
              <h3 className="recommendation-title">Tomato Field (North)</h3>
              <p className="recommendation-text">Recommended fertilizer: Nitrogen-rich organic compost, 2.5kg/acre</p>
              <div className="recommendation-meta">
                <Sprout className="icon-mini icon-green" />
                <span>Last updated: May 18, 2023</span>
              </div>
            </div>
            
            <div className="recommendation blue">
              <h3 className="recommendation-title">Berry Patch (South)</h3>
              <p className="recommendation-text">Recommended irrigation: 0.8 inches/week, early morning schedule</p>
              <div className="recommendation-meta">
                <CloudRain className="icon-mini icon-blue" />
                <span>Last updated: May 20, 2023</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="profile-card">
          <h2 className="card-title">Contact & Resources</h2>
          <div className="contact-links">
            <a href="mailto:james.wilson@organicfarms.com" className="contact-link">
              <Mail className="icon-small" />
              <span>james.wilson@organicfarms.com</span>
            </a>
            <a href="#" className="contact-link">
              <TestTube className="icon-small icon-blue" />
              <span>Soil Analysis Portal</span>
            </a>
            <a href="#" className="contact-link">
              <Wheat className="icon-small icon-amber" />
              <span>Crop Management Dashboard</span>
            </a>
            <a href="#" className="contact-link">
              <Sprout className="icon-small icon-green" />
              <span>Sustainable Farming Resources</span>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;