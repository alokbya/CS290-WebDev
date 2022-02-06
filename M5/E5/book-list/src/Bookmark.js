import React, { useState } from 'react';
import { MdBookmark, MdBookmarkBorder } from 'react-icons/md';

function Bookmark() {
  const [isBookmarked, setBookmarked] = useState(false);
  const toggleBookmark = () => setBookmarked(!isBookmarked);
  return (
    <>
      {isBookmarked
	? <MdBookmark onClick={toggleBookmark} />
	: <MdBookmarkBorder onClick={toggleBookmark} />
      }
    </>
  );
}

export default Bookmark;