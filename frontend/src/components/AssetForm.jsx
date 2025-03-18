import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, getAccessToken } from "../hooks/utilityFns.jsx";
import SubmitButton from "./SubmitButton.jsx";
import { IoCloseCircleOutline, IoSave } from "react-icons/io5"


const AssetForm = ({ asset = null, onSuccess, sections, setFormIsOpen }) => {
    const [formData, setFormData] = useState({ section: "", content: "", tags: "" });
    const [error, setError] = useState("");

    // Get Query Client Instance
    const queryClient = useQueryClient()

    const validSections = sections && sections?.map(section => section.sectionName)
    
    useEffect(() => {
        if (asset) {
            setFormData({ section: asset.section, content: asset.content, tags: asset.tags.join(", ") });
        }
    }, [asset]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError("");
    };

    const handleTagsChange = (e) => {
        setFormData(prev => ({ ...prev, tags: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("")
        const accessToken = getAccessToken();
        if (!accessToken) {
            setError("No access token found");
            return;
        }
        const payload = { 
            section: formData.section, 
            content: formData.content, 
            tags: formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag)
        };
        mutation.mutate(payload);
    };

    const mutation = useMutation({
        mutationFn: async (data) => {
            const url = asset ? `/user/cvassets/${asset._id}` : "/user/cvassets";
            const method = asset ? "patch" : "post";
            
            const response = await api[method](url, data, {
                headers: { Authorization: `Bearer ${getAccessToken()}` }
            });
            return response.data;
        },
        onSuccess: (newData) => {
            queryClient.setQueryData(["cvassets"], (oldData) => {
                if (!oldData) return [newData]
                return [...oldData, newData]
            })

            setFormData({content: "", section: "", tags: ""})
            setFormIsOpen(false)
            
        },
        onError: (err) => setError(err.response?.data?.error || "Operation failed")
    });

    return (
        <form 
            onSubmit={handleSubmit}
            className="rounded-lg bg-white shadow-lg
                        p-6 border border-gray-200 w-1/2 max-w-96"
        >
            <h3 className="text-lg font-bold mb-4">{asset ? "Edit Asset" : "Create Asset"}</h3>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <div className="mb-2">
                <label className="block text-sm font-medium">Section</label>
                <select name="section" value={formData.section} onChange={handleChange} required className="w-full p-2 border rounded">
                    <option value="" disabled>Select a section</option>
                    {validSections && validSections?.map(sec => (
                        <option key={sec} value={sec}>{sec}</option>
                    ))}
                </select>
            </div>
            <div className="mb-2">
                <label className="block text-sm font-medium">Content</label>
                <textarea name="content" value={formData.content} onChange={handleChange} required className="w-full p-2 border rounded" rows="4"></textarea>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium">Tags (comma-separated)</label>
                <input type="text" name="tags" value={formData.tags} onChange={handleTagsChange} className="w-full p-2 border rounded" />
            </div>
            <div className="flex">
                <SubmitButton
                    text="Cancel"
                    style="transparent"
                    className="mr-2"
                    icon={<IoCloseCircleOutline/>}
                    onClick={() => setFormIsOpen(false)}
                />
                <SubmitButton
                    text={asset ? "Update" : "Create"}
                    style="solid"
                    onClick={handleSubmit}
                    isLoading={mutation.isPending}
                    disabled={!formData.section || !formData.content || !formData.tags}
                />
            </div>
        </form>
    );
};

export default AssetForm;

