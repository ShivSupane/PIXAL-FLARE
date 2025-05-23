import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Edit, Trash2, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Form schema validation
const photographerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  role: z.string().min(2, { message: "Role must be provided." }),
  location: z.string().min(2, { message: "Location must be provided." }),
  bio: z.string().min(10, { message: "Bio must be at least 10 characters." }),
  specialization: z.string().min(2, { message: "Specialization must be provided." }),
  image: z.string().url({ message: "Please provide a valid image URL." }).optional(),
  rating: z.number().min(1).max(5).default(5),
  reviews: z.number().default(0),
  isActive: z.boolean().default(true),
});

type Photographer = z.infer<typeof photographerSchema> & {
  _id?: string;
  createdAt?: string;
};

const PhotographerManagement: React.FC = () => {
  const [photographers, setPhotographers] = useState<Photographer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPhotographer, setEditingPhotographer] = useState<Photographer | null>(null);
  const { toast } = useToast();

  const form = useForm<Photographer>({
    resolver: zodResolver(photographerSchema),
    defaultValues: {
      name: "",
      role: "",
      location: "",
      bio: "",
      specialization: "",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=",
      rating: 5,
      reviews: 0,
      isActive: true,
    },
  });

  // Load photographers from API
  const fetchPhotographers = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/photographers`);
      setPhotographers(res.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching photographers:", error);
      toast({
        title: "Error",
        description: "Failed to load photographers",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotographers();
  }, []);

  // Handle form submission for creating/updating photographer
  const onSubmit = async (data: Photographer) => {
    try {
      if (editingPhotographer?._id) {
        // Update existing photographer
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/photographers/${editingPhotographer._id}`,
          data
        );
        toast({
          title: "Success",
          description: "Photographer updated successfully",
        });
      } else {
        // Create new photographer
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/photographers`,
          data
        );
        toast({
          title: "Success",
          description: "Photographer added successfully",
        });
      }
      fetchPhotographers();
      setIsDialogOpen(false);
      form.reset();
      setEditingPhotographer(null);
    } catch (error) {
      console.error("Error submitting photographer:", error);
      toast({
        title: "Error",
        description: "Failed to save photographer details",
        variant: "destructive",
      });
    }
  };

  // Delete photographer
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this photographer?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/photographers/${id}`);
        toast({
          title: "Success",
          description: "Photographer deleted successfully",
        });
        fetchPhotographers();
      } catch (error) {
        console.error("Error deleting photographer:", error);
        toast({
          title: "Error",
          description: "Failed to delete photographer",
          variant: "destructive",
        });
      }
    }
  };

  // Edit photographer
  const handleEdit = (photographer: Photographer) => {
    setEditingPhotographer(photographer);
    form.reset({
      name: photographer.name,
      role: photographer.role,
      location: photographer.location,
      bio: photographer.bio,
      specialization: photographer.specialization,
      image: photographer.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=",
      rating: photographer.rating,
      reviews: photographer.reviews,
      isActive: photographer.isActive,
    });
    setIsDialogOpen(true);
  };

  // Add new photographer
  const handleAddNew = () => {
    setEditingPhotographer(null);
    form.reset({
      name: "",
      role: "",
      location: "",
      bio: "",
      specialization: "",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=",
      rating: 5,
      reviews: 0,
      isActive: true,
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium text-white">Photographer Management</h2>
        <Button 
          onClick={handleAddNew}
          className="bg-[#D4AF37] hover:bg-[#B59020] text-black"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Photographer
        </Button>
      </div>

      <Card className="bg-white/5 border-white/10 text-white overflow-hidden">
        {isLoading ? (
          <CardContent className="p-6 text-center">Loading photographers...</CardContent>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-white/5">
                <TableHead className="text-white">Name</TableHead>
                <TableHead className="text-white">Role</TableHead>
                <TableHead className="text-white">Location</TableHead>
                <TableHead className="text-white">Specialization</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-white text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {photographers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-white/70">
                    No photographers found. Add your first photographer to get started.
                  </TableCell>
                </TableRow>
              ) : (
                photographers.map((photographer) => (
                  <TableRow
                    key={photographer._id}
                    className="border-white/10 hover:bg-white/5"
                  >
                    <TableCell className="font-medium text-white">
                      {photographer.name}
                    </TableCell>
                    <TableCell className="text-white/70">{photographer.role}</TableCell>
                    <TableCell className="text-white/70">{photographer.location}</TableCell>
                    <TableCell className="text-white/70">{photographer.specialization}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          photographer.isActive
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {photographer.isActive ? "Active" : "Inactive"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white/70 hover:text-white hover:bg-white/10 mr-2"
                        onClick={() => handleEdit(photographer)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-500 hover:bg-red-500/10"
                        onClick={() => handleDelete(photographer._id as string)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </Card>

      {/* Add/Edit Photographer Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gray-900 text-white border-white/10 max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {editingPhotographer ? "Edit Photographer" : "Add New Photographer"}
            </DialogTitle>
            <DialogDescription className="text-white/70">
              Fill in the details below to {editingPhotographer ? "update the" : "add a new"} photographer.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          className="bg-white/5 border-white/10 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Lead Photographer"
                          className="bg-white/5 border-white/10 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Mumbai"
                          className="bg-white/5 border-white/10 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="specialization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Specialization</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Weddings & Fashion"
                          className="bg-white/5 border-white/10 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/image.jpg"
                          className="bg-white/5 border-white/10 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rating (1-5)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            max="5"
                            step="0.1"
                            className="bg-white/5 border-white/10 text-white"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="reviews"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Review Count</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            className="bg-white/5 border-white/10 text-white"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Professional photographer with experience in..."
                        className="bg-white/5 border-white/10 text-white min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2 justify-end">
                    <FormLabel>Active Status</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <span className="text-sm text-white/70 mr-2">
                          {field.value ? "Active" : "Inactive"}
                        </span>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="border-white/10 hover:bg-white/10 text-white"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-[#D4AF37] hover:bg-[#B59020] text-black"
                >
                  {editingPhotographer ? "Update" : "Add"} Photographer
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PhotographerManagement; 