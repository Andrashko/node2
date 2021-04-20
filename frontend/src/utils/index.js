function truncTitle(title, len) {
    if (!title) return "No title";
    if (title.length > len) return title.substring(0, len) + "...";
    else return title;
  }
export {truncTitle};