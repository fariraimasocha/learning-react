import React from 'react';

export default function Tenary() {
  let age = 8;

  if (age > 10) {
    console.log('Young');
  } else {
    console.log('Old');
  }

  let name = age > 9 ? 'pedro' : 'not Pedro';
  console.log(name);

  return age > 9 ? <Pedro /> : <Not_Pedro />;
}

export const Pedro = async () => {
  return (
    <div>
      <h1>Pedro</h1>
    </div>
  );
};

export const Not_Pedro = async () => {
  return (
    <div>
      <h1>Not Pedro</h1>
    </div>
  );
};
