import React, { useEffect, useState } from "react";
import axios from '../../../api/axios';
import { ADD_CATEGORY } from '../../../api/apiUrl';
import toast, { Toaster } from 'react-hot-toast';
import { Spinner } from "reactstrap";
import { useTranslation } from "react-i18next";

export default function Modal({ showModal, setShowModal, getCategories }) {
    let { admin, token } = JSON.parse(sessionStorage.getItem('userDetails'));
    const [categories, setCategories] = useState({ name: '' });
    const [isSave, setIsSave] = useState(false);
    const { t } = useTranslation();

    const addCategory = async (event) => {
        event.preventDefault();
        setIsSave(true);
        try {
            const response = await axios.post(ADD_CATEGORY, categories, { headers: { "Authorization": "Bearer " + token } });
            toast.success('successfully Added!');
            setShowModal(false);
            getCategories();
            setIsSave(false);
            setCategories({ name: '' });
        } catch (error) {
            setIsSave(false);
            toast.error(error.response.data.msg);
        }
    }

    return (
        <>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <form onSubmit={addCategory}>
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold text-center"> {t("Add Category")}</h3>
                                </div>
                                <div className="relative p-6 flex-auto">
                                    <div className="py-5">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                            {t("Category")}
                                        </label>
                                        <input type="text" name="name" onChange={(e) => setCategories({ ...categories, [e.target.name]: e.target.value })} value={categories?.name} placeholder={t("Enter Category")} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 width-input-400"/>
                                    </div>
                                </div>
                                <div className="flex items-center justify-end p-1 border-t border-solid border-slate-200 rounded-b">
                                    <button type="button" onClick={() => setShowModal(false)} className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"> {t("Close")} </button>
                                    {!isSave ?
                                        <button className="bg-emerald-500 text-white active:bg-emerald-600 text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="submit" > {t("ADD")}</button>
                                        :
                                        <button className="bg-emerald-500 text-white active:bg-emerald-600 text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"> <Spinner animation="border" size="sm"></Spinner></button>
                                    }
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
            <Toaster />
        </>
    );
}