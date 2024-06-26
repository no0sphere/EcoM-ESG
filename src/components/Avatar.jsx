import React from 'react';

function Avatar({ src, alt = "User Avatar", className = "avatar-image" }) {
    return <img src={src} alt={alt} className={className} />;
}

export default Avatar;