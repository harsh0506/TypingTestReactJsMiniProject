import React, { useState } from 'react'
import "./App.css"
import { useNavigate } from "react-router-dom";

function app() {

    const navigate = useNavigate();

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    function handleClick() {
        if (!name || name === "" || name === undefined) {
            alert("enter name ")
            return
        } if (!email || email === "" || email === undefined) {
            alert("enter Email ")
            return
        }
        navigate("/about", { state: { name, email } });
    }


    return (
        <>
            <div style={{ width: "98vw" }} class="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
                <div
                    class="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1"
                >
                    <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">

                        <div class="mt-12 flex flex-col items-center">
                            <h1 class="text-2xl xl:text-3xl font-extrabold">
                                Enter Credential
                            </h1>
                            <div class="w-full flex-1 mt-8">

                                <div class="mx-auto max-w-xs">
                                    <input
                                        value={name}
                                        onChange={(e) => setName(e.target.value.trim())}
                                        class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="name"
                                        placeholder="Ennter a name"
                                    />
                                    <input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value.trim())}
                                        class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type="Email"
                                        placeholder="Enter your mail"
                                    />
                                    <button
                                        onClick={handleClick}
                                        class="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                    >
                                        <svg
                                            class="w-6 h-6 -ml-2"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        >
                                            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                            <circle cx="8.5" cy="7" r="4" />
                                            <path d="M20 8v6M23 11h-6" />
                                        </svg>
                                        <span class="ml-3">
                                            start Typing
                                        </span>
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex-1 bg-indigo-100 text-center hidden lg:flex">
                        <div
                            class="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                            style={{ backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/notes-5bb98.appspot.com/o/Typing-bro.png?alt=media&token=f75be7d5-0046-465c-b958-d106e67884eb')" }}
                        ></div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default app