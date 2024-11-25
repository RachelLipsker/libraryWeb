const normalizeUserFromDb = (user) => (
    {
        phone: user.phone,
        image: user.image,
        alt: user.alt
    }
)
export default normalizeUserFromDb;