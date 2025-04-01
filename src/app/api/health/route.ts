export const GET = async () => {
    Response.json({
        success: true,
        message: "server running"
    }, { status: 200 })
}