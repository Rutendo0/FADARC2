export const handleShare = (postTitle: string, postExcerpt: string, postUrl: string) => {
  const shareText = `Check out: "${postTitle}" - ${postUrl}`
  if (navigator.share) {
    navigator.share({
      title: postTitle,
      text: postExcerpt,
      url: postUrl,
    })
  } else {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank")
  }
}
