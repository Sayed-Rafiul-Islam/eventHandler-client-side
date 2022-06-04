import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const UpdateEvent = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const imageStorageKey = 'f78a08d7ab8036cae9a602c466f23ece';



    const createEvent = async data => {
        const image = data.image[0];
        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
        const formData = new FormData();
        formData.append('image', image)
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    const img = result.data.url;
                    const newEvent = {
                        type: data.type,
                        uid: data.uid,
                        name: data.name,
                        image: img,
                        tagline: data.tagline,
                        schedule: data.schedule,
                        description: data.description,
                        moderator: data.moderator,
                        category: data.category,
                        sub_category: data.sub_category,
                        rigor_rank: data.rigor_rank,
                        attendees: data.attendees
                    }

                    fetch(`https://boiling-savannah-20518.herokuapp.com/api/v3/app/updateEvent?uid=${data.uid}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(newEvent)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            toast.success('Event Updated')

                        })
                    reset()
                }
            })

    }

    return (
        <div className='mt-3 border border-success p-3 rounded rounded-5'>
            <form onSubmit={handleSubmit(createEvent)}>
                <div className='form-control'>
                    <label className=''>
                        <span className='label-text'>Event Type</span>
                    </label>
                    <input
                        type='text'
                        placeholder="Event Type"
                        className='input input-bordered'
                        {...register("type", {
                            required: {
                                value: true,
                                message: 'Event type is Required'
                            }
                        })} />
                    <label className='text'>
                        {errors.name?.type === 'required' && <span className='label-text-alt text-red-500'>{errors.name.message}</span>}
                    </label>
                </div>
                <div className='form-control'>
                    <label className=''>
                        <span className='label-text'>Event Uid</span>
                    </label>
                    <input
                        type='number'
                        placeholder="Uid"
                        className='input input-bordered'
                        {...register("uid", {
                            required: {
                                value: true,
                                message: 'Uid is Required'
                            }
                        })} />
                    <label className='text'>
                        {errors.name?.type === 'required' && <span className='label-text-alt text-red-500'>{errors.name.message}</span>}
                    </label>
                </div>
                <div className='form-control'>
                    <label className=''>
                        <span className='label-text'>Event Name</span>
                    </label>
                    <input
                        type='text'
                        placeholder="Event Name"
                        className='input input-bordered'
                        {...register("name", {
                            required: {
                                value: true,
                                message: 'Event Name is Required'
                            }
                        })} />
                    <label className='text'>
                        {errors.name?.type === 'required' && <span className='label-text-alt text-red-500'>{errors.name.message}</span>}
                    </label>
                </div>

                <div className='form-control w-full mx-w-xs'>
                    <label className='text-left ml-4 mt-2'>
                        <span className='label-text'>Image</span>
                    </label>
                    <input
                        type='file'
                        className='input input-bordered w-full mx-w-xs'
                        {...register("image", {
                            required: {
                                value: true,
                                message: 'Image is Required'
                            }
                        })} />
                    <label className='text'>
                        {errors.image?.type === 'required' && <span className='label-text-alt text-red-500'>{errors.image.message}</span>}
                    </label>
                </div>


                <div className='form-control w-full mx-w-xs'>
                    <label className='text-left ml-4 mt-2'>
                        <span className='label-text'>Description</span>
                    </label>
                    <input
                        type='text'
                        placeholder="Description"
                        className='input input-bordered w-full mx-w-xs'
                        {...register("description", {
                            required: {
                                value: true,
                                message: 'Description is Required'
                            }
                        })} />
                    <label className='text'>
                        {errors.description?.type === 'required' && <span className='label-text-alt text-red-500'>{errors.description.message}</span>}
                    </label>
                </div>

                <div className='form-control w-full mx-w-xs'>
                    <label className='text-left ml-4 mt-2'>
                        <span className='label-text'>Tagline</span>
                    </label>
                    <input
                        type='text'
                        placeholder="Tagline"
                        className='input input-bordered w-full mx-w-xs'
                        {...register("tagline", {
                            required: {
                                value: true,
                                message: 'Tagline is Required'
                            }
                        })} />
                    <label className='text'>
                        {errors.quantity?.type === 'required' && <span className='label-text-alt text-red-500'>{errors.quantity.message}</span>}
                    </label>
                </div>

                <div className='form-control w-full mx-w-xs'>
                    <label className='text-left ml-4 mt-2'>
                        <span className='label-text'>Schedule</span>
                    </label>
                    <input
                        type='date'
                        placeholder="Schedule"
                        className='input input-bordered w-full mx-w-xs'
                        {...register("schedule", {
                            required: {
                                value: true,
                                message: 'schedule is Required'
                            }
                        })} />
                    <label className='text'>
                        {errors.minimumQuantity?.type === 'required' && <span className='label-text-alt text-red-500'>{errors.minimumQuantity.message}</span>}
                    </label>
                </div>

                <div className='form-control w-full mx-w-xs'>
                    <label className='text-left ml-4 mt-2'>
                        <span className='label-text'>Moderator</span>
                    </label>
                    <input
                        type='text'
                        placeholder="Moderator"
                        className='input input-bordered w-full mx-w-xs'
                        {...register("moderator", {
                            required: {
                                value: true,
                                message: 'Moderator is Required'
                            }
                        })} />
                    <label className='text'>
                        {errors.price?.type === 'required' && <span className='label-text-alt text-red-500'>{errors.price.message}</span>}
                    </label>
                </div>

                <div className='form-control w-full mx-w-xs'>
                    <label className='text-left ml-4 mt-2'>
                        <span className='label-text'>Rigor Rank</span>
                    </label>
                    <input
                        type='text'
                        placeholder="Rigor Rank"
                        className='input input-bordered w-full mx-w-xs'
                        {...register("rigor_rank", {
                            required: {
                                value: true,
                                message: 'Rigor Rank is Required'
                            }
                        })} />
                    <label className='text'>
                        {errors.price?.type === 'required' && <span className='label-text-alt text-red-500'>{errors.price.message}</span>}
                    </label>
                </div>
                <div className='form-control w-full mx-w-xs'>
                    <label className='text-left ml-4 mt-2'>
                        <span className='label-text'>Sub Category</span>
                    </label>
                    <input
                        type='text'
                        placeholder="Sub Category"
                        className='input input-bordered w-full mx-w-xs'
                        {...register("sub_moderator", {
                            required: {
                                value: true,
                                message: 'Sub Category is Required'
                            }
                        })} />
                    <label className='text'>
                        {errors.price?.type === 'required' && <span className='label-text-alt text-red-500'>{errors.price.message}</span>}
                    </label>
                </div>
                <div className='form-control w-full mx-w-xs'>
                    <label className='text-left ml-4 mt-2'>
                        <span className='label-text'>Category</span>
                    </label>
                    <input
                        type='text'
                        placeholder="Category"
                        className='input input-bordered w-full mx-w-xs'
                        {...register("category", {
                            required: {
                                value: true,
                                message: 'Category is Required'
                            }
                        })} />
                    <label className='text'>
                        {errors.price?.type === 'required' && <span className='label-text-alt text-red-500'>{errors.price.message}</span>}
                    </label>
                </div>
                <input className='btn btn-success mt-3' type="submit" value='Update Event' />
            </form>
        </div>
    );
};

export default UpdateEvent;