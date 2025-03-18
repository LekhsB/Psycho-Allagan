"use client";

import { useState } from "react";
import { FaUpload, FaImage, FaVideo, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function UploadSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadType, setUploadType] = useState<"image" | "video" | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Gestion du glisser-déposer
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  // Gestion du dépôt de fichier
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      
      // Vérifier si le type de fichier correspond au type sélectionné
      if (uploadType === "image" && file.type.startsWith("image/")) {
        setSelectedFile(file);
      } else if (uploadType === "video" && file.type.startsWith("video/")) {
        setSelectedFile(file);
      } else {
        alert(`Veuillez sélectionner un fichier de type ${uploadType}`);
      }
    }
  };
  
  // Gestion de la sélection de fichier
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  // Réinitialisation du formulaire
  const resetForm = () => {
    setUploadType(null);
    setSelectedFile(null);
  };
  
  // Simuler l'envoi du fichier
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ici, vous implémenteriez la logique d'upload réelle
    alert(`Upload simulé : ${selectedFile?.name}`);
    
    // Fermer le modal et réinitialiser
    setIsModalOpen(false);
    resetForm();
  };
  
  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-lg hover:from-violet-700 hover:to-blue-700 transition-colors shadow-lg"
      >
        <FaUpload />
        <span>Partager</span>
      </button>
      
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => {
              setIsModalOpen(false);
              resetForm();
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-black/90 border border-violet-500/30 rounded-xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Partager un média</h2>
                <button 
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaTimes />
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                {!uploadType ? (
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <button
                      type="button"
                      onClick={() => setUploadType("image")}
                      className="flex flex-col items-center justify-center p-6 bg-violet-900/20 border border-violet-500/30 rounded-lg hover:bg-violet-900/40 transition-colors"
                    >
                      <FaImage className="text-4xl mb-3 text-violet-400" />
                      <span className="text-white font-medium">Image</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setUploadType("video")}
                      className="flex flex-col items-center justify-center p-6 bg-blue-900/20 border border-blue-500/30 rounded-lg hover:bg-blue-900/40 transition-colors"
                    >
                      <FaVideo className="text-4xl mb-3 text-blue-400" />
                      <span className="text-white font-medium">Vidéo</span>
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-4">
                      <div 
                        className={`border-2 border-dashed rounded-lg p-8 text-center ${
                          dragActive 
                            ? "border-violet-500 bg-violet-900/20" 
                            : "border-gray-600 hover:border-violet-500/50 hover:bg-violet-900/10"
                        } transition-colors cursor-pointer`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => document.getElementById("fileInput")?.click()}
                      >
                        {selectedFile ? (
                          <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-violet-900/40 rounded-full flex items-center justify-center mb-3">
                              {uploadType === "image" ? (
                                <FaImage className="text-2xl text-violet-400" />
                              ) : (
                                <FaVideo className="text-2xl text-blue-400" />
                              )}
                            </div>
                            <p className="text-white font-medium mb-1 break-all">{selectedFile.name}</p>
                            <p className="text-gray-400 text-sm">
                              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                            <button
                              type="button"
                              className="mt-3 text-red-400 text-sm hover:text-red-300"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedFile(null);
                              }}
                            >
                              Supprimer
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center">
                            <FaUpload className="text-3xl text-gray-400 mb-3" />
                            <p className="text-white font-medium mb-1">
                              Glissez-déposez votre {uploadType === "image" ? "image" : "vidéo"} ici
                            </p>
                            <p className="text-gray-400 text-sm">ou cliquez pour sélectionner un fichier</p>
                          </div>
                        )}
                      </div>
                      
                      <input
                        id="fileInput"
                        type="file"
                        className="hidden"
                        accept={uploadType === "image" ? "image/*" : "video/*"}
                        onChange={handleFileChange}
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                          Titre
                        </label>
                        <input
                          type="text"
                          className="w-full bg-black/60 border border-violet-500/30 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                          placeholder="Donnez un titre à votre média"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                          Description
                        </label>
                        <textarea
                          className="w-full bg-black/60 border border-violet-500/30 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 h-24"
                          placeholder="Décrivez votre média"
                        ></textarea>
                      </div>
                      
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                          Catégorie
                        </label>
                        <select className="w-full bg-black/60 border border-violet-500/30 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50">
                          <option value="" disabled selected>Sélectionnez une catégorie</option>
                          <option value="raids">Raids</option>
                          <option value="parties">Soirées</option>
                          <option value="rp">RP</option>
                          <option value="housing">Housing</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}
                
                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      if (uploadType) {
                        resetForm();
                      } else {
                        setIsModalOpen(false);
                      }
                    }}
                    className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    {uploadType ? "Retour" : "Annuler"}
                  </button>
                  
                  {uploadType && (
                    <button
                      type="submit"
                      disabled={!selectedFile}
                      className={`px-4 py-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-lg transition-opacity ${
                        !selectedFile ? "opacity-50 cursor-not-allowed" : "hover:from-violet-700 hover:to-blue-700"
                      }`}
                    >
                      Partager
                    </button>
                  )}
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 