'use client';
import React from 'react';

const GOBack = () => {
  return (
    <button type="button" onClick={() => window.history.back()}>
      Go back
    </button>
  );
};

export default GOBack;
