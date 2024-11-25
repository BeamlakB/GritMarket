import React from 'react'
import { useState, useEffect } from "react";
import httpsClient from "../../httpsClient";
import styles from "./account.module.css"
import { StringifyOptions } from 'querystring';

const CreatePost = () =>{
    //if user is logged in.... 
    const[formData, setFormData] = useState({ //current form data, updated data
        image: {
            file: null as File | null,
            preview: null as string | null,
        },
        mainCategory: '',
        subCategory: '',
        title: '',
        price: '',
        description: '',
    });

    const [previewImage, setPreview] = useState("");
    const [error, setError] = useState("");//Error handling
    const [mesg, setMesg] = useState("");

    //listed categories
    const categories = [
        {
            mainCategory: "Fashion & Accessories",
            subCategories: [
                "Pre-Owned Clothing",
                "Brand New Clothing",
                "Shoes",
                "Neckalces",
                "Bags",
                "Hats",
                "Vintage Clothing",
                "Rings", 
                "Body Care",
                "Other"
            ]
        },
        {
            mainCategory: "Electronics & Accessories",
            subCategories: [
                "Computers",
                "Laptops",
                "Smartphones",
                "Tvs",
                "Gaming Consoles",
                "Cables and Cords",
                "Smart Watches",
                "Calculators",
                "USB Drives",
                "Other"

            ]
        },
        {
            mainCategory: "Hobbies & Games",
            subCategories: [
                "Collectibles",
                "Toys",
                "Board Games",
                "Card Games",
                "Puzzles",
                "Musical Instruments",
                "Sports Equipment",
                "Books",
                "CDs and Vinyl Records",
                "Art Supplies",
                "Handcrafted Items",
                "Camping Equipment",
                "Gardening Supplies",
                "Trading Cards",
                "Other",

                "Furniture",
                "School Supplies"
            ]
        },
        {
            mainCategory: "Tickets and Events",
            subCategories: [
                "Concert Tickets",
                "UMBC Events",
                "Sport Event Tickets"
            ]
        },
        {
            mainCategory: "ADD CATEGORIES TO HOME",
            subCategories: [
                "Furniture",
                "School Supplies"   
            ]
        }
    ];

    const [mainCatList, setMainCatList] = useState<string[]>([]);
    const [subCatList, setSubCatList] = useState<string[]>([]);

    useEffect(() =>{
        const mainCategories = categories.map(category => category.mainCategory);
        setMainCatList(mainCategories);
    }, []);

    const mainCatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectMainCat = e.target.value;
        setFormData(prevState => ({
            ...prevState,
            mainCategory: selectMainCat,
            subCategory: '',
        }));

        const selectCat = categories.find(cat => cat.mainCategory === selectMainCat);
        if(selectCat) {
            setSubCatList(selectCat.subCategories);
        }
        else{
            setSubCatList([]);
        }
    };

    const subCatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            subCategory: value,
        }));
    };

    //Handles image change
    const ChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const imageFile = e.target.files?.[0];
        if(imageFile) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setFormData(prevState => ({
                    ...prevState, 
                    image: {
                        file: imageFile,
                        preview: reader.result as string,
                    },
                }));
                setPreview(reader.result as string);
            };

            reader.readAsDataURL(imageFile);
        }
    };

    //Handles change in form input fields
    const ChangeData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,    
        }));
    };

    //Form Submission
    const SubmitForm = async (e:React.FormEvent) => {
        e.preventDefault();

        const post = new FormData();
        if(formData.image.file) {
            post.append("file", formData.image.file);
        }
        if(formData.image.preview){
            post.append("imagePreview", formData.image.preview);
        }
        post.append("mainCategory", formData.mainCategory);
        post.append("subCategory", formData.subCategory);
        post.append("title", formData.title);
        post.append("price", formData.price);
        post.append("description", formData.description);

        try{
            const response = await httpsClient.post("http://localhost:5000/add-post", post, {withCredentials: true});

            if(response.status === 200) {
                setMesg("Post created successfully!");
                setFormData({
                    image: {
                        file: null,
                        preview: null,
                    },
                    mainCategory: '',
                    subCategory: '',
                    title: '',
                    price: '',
                    description: '',
                });
                setPreview(""); //clears the preview image
            }
        }

        catch (err:any){
            setError("Failed to create post. Please try again.");
        }

    };

    return (
        <div className={styles.postPageContainer}>
        <div className={styles.postBox}>
            <h1>Add a Post</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            {mesg && <div className="alert alert-success">{mesg}</div>}

            <div className = "shadow p-3 mb-5 bg-body rounded">
                <form onSubmit = {SubmitForm}>
                <div className = {styles.formGroup}>
                        <label className = {styles.label} htmlFor="image">Image</label>
                        <input
                            type = "file"
                            className = {styles.input}
                            id = "image"
                            name = "file"
                            onChange = {ChangeImage}
                            required
                        />
                        {formData.image.preview && (
                            <div className = {styles.imagePreview}>
                                <img 
                                    src = {formData.image.preview} 
                                    alt = "Preview" 
                                    className = {styles.previewImg}
                                />
                            </div>
                        )}
                    </div>

                    <div className = {styles.formGroup}>
                        <label className = {styles.label} htmlFor="title">Title</label>
                        <input
                            type = "text"
                            className = {styles.input}
                            id = "title"
                            name = "title"
                            value = {formData.title}
                            onChange = {ChangeData}
                            required
                        />
                    </div>

                    <div className = {styles.formGroup}>
                        <label className = {styles.label} htmlFor="mainCategory">Main Category</label>
                        <select
                            className = {styles.input}
                            id = "mainCategory"
                            name = "mainCategory"
                            value = {formData.mainCategory}
                            onChange = {mainCatChange}
                            required
                        >
                            <option value = "">Select Main Category</option>
                            {mainCatList.map((mainCat, index) => (
                                <option key = {index} value = {mainCat}>
                                    {mainCat}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    {formData.mainCategory && (
                        <div className = {styles.formGroup}>
                            <label className = {styles.label} htmlFor="subCategory">Subcategory</label>
                            <select
                                className = {styles.input}
                                id = "subcategory"
                                name = "subcategory"
                                value = {formData.subCategory}
                                onChange = {subCatChange}
                                required
                            >
                                <option value = "">Select Subcategory</option>
                                {subCatList.map((subCat, index) => (
                                    <option key = {index} value = {subCat}>
                                        {subCat}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className = {styles.formGroup}>
                    <label className = {styles.label} htmlFor="description">Description</label>
                        <textarea
                            className = {styles.input}
                            id = "description"
                            name = "description"
                            value = {formData.description}
                            onChange = {ChangeData}
                            rows = {5}
                            required
                        ></textarea>
                    </div>

                    <div className = {styles.formGroup}>
                        <label className = {styles.label} htmlFor="price">Price</label>
                        <input
                            type = "number"
                            className = {styles.input}
                            id = "price"
                            name = "price"
                            value = {formData.price}
                            onChange = {ChangeData}
                            required
                        />
                    </div>

                    <button className={styles.button} type = "submit">Submit</button>
                </form>
            </div>
        </div>
        </div>    
    );
};

export default CreatePost;
