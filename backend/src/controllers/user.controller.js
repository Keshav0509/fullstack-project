import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // res.status(200).json({ message: "hello anki" });
  // get user details from frontend
  // validate user details
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload images to cloudinary: avatar
  // create user object - create entry in database
  // remove password and refresh token field from user object
  // generate jwt token
  // check for user creation
  // send response to frontend

  const { userName, email, fullName, password } = req.body;
  // check if all fields are provided
  if (
    [fullName, userName, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All field is required");
  }
  // check if user already exists
  const existUser = await User.findOne({
    $or: [{ userName }, { email }],
  });
  if (existUser) {
    throw new ApiError(400, "User already exists");
  }
  // check for images
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  // upload images to cloudinary
  console.log("Uploading avatar to cloudinary");
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar Required");
  }

  // create user object
  const user = await User.create({
    fullName,
    userName: userName.toLowerCase(),
    email,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while creating user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, "User created successfully", createdUser));
});

export { registerUser };
