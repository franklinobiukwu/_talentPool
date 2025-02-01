import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ListCardHeading from "./ListCardHeading";
import SimpleListCard from "./SimpleListCard"
import { api, getToken } from "../hooks/utilityFns.jsx";
import { useState } from "react";

const token = getToken()

// Fetch Sections
const fetchSections = async() => {
    const response = await api.get(`/user/cvsections`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    
    return response.data
}

// Delete Section
const deleteSection = async (sectionId) => {
    const response = await api.delete(`/user/cvsections/${sectionId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

// Update Section
const updateSection = async (sectionId, sectionName) => {
    const response = await api.patch(`/user/cvsections/${sectionId}`, {sectionName}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

const ListSections = (props) => {

    const [deleteId, setDeleteId] = useState('')

    const queryClient = useQueryClient()

    {/* USE QUERY */}
    const { data, isPending, isError, error } = useQuery({
        queryKey: ["cvSections"],
        queryFn: fetchSections
    })

    {/* MUTATE DATA */}
    const {mutate, isPending:isPendingDelete, isError:isErrorDelete, error:errorDelete } = useMutation({
        mutationFn: deleteSection,
        onSuccess: (deletedSection) => {
            console.log({deletedSection})
            queryClient.setQueryData(["cvSections"], (oldData) => {
                console.log({oldData})
                const updatedSections = oldData?.filter((section) => (
                    section._id !== deletedSection._id
                ))
                return updatedSections
            })
        }
    })

    const handleDelete = (sectionId) => {
        setDeleteId(sectionId)
        mutate(sectionId)
    }

    const handleUpdate = ({_id, title}) => {

    }

    const handleEdit = () => {
        props.setFormIsOpen(true)
    }


    return (
        <div>
            {/* Section Heading */}
            <div className="mb-5">
                <ListCardHeading
                    title="Sections"
                    setFormIsOpen={props.setFormIsOpen}
                />
            </div>
            {/* Display Loading */}
            {isPending && <div>Loading...</div>}
            {/* Sections List */}
            <div>
                {data?.map((section) => (
                    <div key={section._id} className="mb-2">
                        <SimpleListCard 
                            title = {section.sectionName}
                            _id = {section._id}
                            handleDelete={handleDelete}
                            isLoading={isPendingDelete}
                            deleteId={deleteId}
                            handleEdit={handleEdit}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
export default ListSections
