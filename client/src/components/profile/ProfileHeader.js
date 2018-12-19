import React from "react";
import is_empty from "../../validation/is_empty";

const ProfileHeader = ({ profile }) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-info text-white mb-3">
          <div className="row">
            <div className="col-4 col-md-3 m-auto">
              <img
                className="rounded-circle"
                src={profile.user.avatar}
                alt=""
              />
            </div>
          </div>
          <div className="text-center">
            <h1 className="display-4 text-center">{profile.user.name}</h1>
            <p className="lead text-center">
              {profile.status}
              {is_empty(profile.company) ? null : (
                <span> at {profile.company}</span>
              )}
            </p>
            {is_empty(profile.location) ? null : <p>{profile.location}</p>}
            <p>
              {is_empty(profile.website) ? null : (
                <a
                  className="text-white p-2"
                  href={"http://" + profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-globe fa-2x" />
                </a>
              )}
              {is_empty(profile.socialM && profile.socialM.twitter) ? null : (
                <a
                  className="text-white p-2"
                  href={"http://" + profile.socialM.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-twitter fa-2x" />
                </a>
              )}
              {is_empty(profile.socialM && profile.socialM.facebook) ? null : (
                <a
                  className="text-white p-2"
                  href={"http://" + profile.socialM.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-facebook fa-2x" />
                </a>
              )}
              {is_empty(profile.socialM && profile.socialM.youtube) ? null : (
                <a
                  className="text-white p-2"
                  href={"http://" + profile.socialM.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-youtube fa-2x" />
                </a>
              )}
              {is_empty(profile.socialM && profile.socialM.linkedin) ? null : (
                <a
                  className="text-white p-2"
                  href={"http://" + profile.socialM.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-linkedin fa-2x" />
                </a>
              )}
              {is_empty(profile.socialM && profile.socialM.instagram) ? null : (
                <a
                  className="text-white p-2"
                  href={"http://" + profile.socialM.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-instagram fa-2x" />
                </a>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ProfileHeader;
