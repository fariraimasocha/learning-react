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

  return age > 9 ? <div>pedro</div> : <div>Not Pedro</div>;
}
