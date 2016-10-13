import React from 'react';

export const Invitation = ({
  user,
  book,
  link,
}) => {
  return (
    <div className="">
      <p className="">
        {user} invited you to edit {book}.
        <br />
        Please click the link below:
        <br />
        <a href={link} className="">{link}</a>
      </p>
    </div>
  );
};
