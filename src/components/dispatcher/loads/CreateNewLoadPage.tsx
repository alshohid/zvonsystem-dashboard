
'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { ChevronDown } from 'lucide-react';
import SubmissionDoneModal from '../SubmissionDoneModal';
import { InputField } from '../reusable-component/InputField';
import { SelectField } from '../reusable-component/SelectField';
import UploadDropzoneField from '../../ui/input/UploadDropzoneField';


interface FormDataType {
  carrier: string;
  loadNumber: string;
  brokerName: string;
  brokerRef: string;
  brokerEmail: string;
  brokerPhone: string;
  pickupCompany: string;
  pickupDate: string;
  pickupTime: string;
  pickupTimeType: 'AM' | 'PM';
  pickupAddress: string;
  deliveryCompany: string;
  deliveryDate: string;
  deliveryTime: string;
  deliveryTimeType: 'AM' | 'PM';
  deliveryAddress: string;
  assignDriver: string;
  assignTruck: string;
  assignTrailer: string;
  ratePerMile: string;
  totalMiles: string;
  deadheadMiles: string;
  loadedMiles: string;
  notes: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function CreateNewLoadPage() {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [uploadResetSignal, setUploadResetSignal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isRateConfirmationVisible, setIsRateConfirmationVisible] =
    useState(false);
  const [brokerDocuments, setBrokerDocuments] = useState<File[]>([]);
  const [documentType, setDocumentType] = useState('BOL');
  const [docUploadResetSignal, setDocUploadResetSignal] = useState(0);
  const [isSendingToBroker, setIsSendingToBroker] = useState(false);

  const [formData, setFormData] = useState<FormDataType>({
    carrier: '',
    loadNumber: '',
    brokerName: '',
    brokerRef: '',
    brokerEmail: '',
    brokerPhone: '',
    pickupCompany: '',
    pickupDate: '',
    pickupTime: '',
    pickupTimeType: 'AM',
    pickupAddress: '',
    deliveryCompany: '',
    deliveryDate: '',
    deliveryTime: '',
    deliveryTimeType: 'PM',
    deliveryAddress: '',
    assignDriver: '',
    assignTruck: '',
    assignTrailer: '',
    ratePerMile: '',
    totalMiles: '',
    deadheadMiles: '',
    loadedMiles: '',
    notes: '',
  });

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.carrier.trim()) newErrors.carrier = 'Carrier is required';
    if (!formData.loadNumber.trim())
      newErrors.loadNumber = 'Load number is required';
    if (!formData.brokerName.trim())
      newErrors.brokerName = 'Broker name is required';
    if (!formData.brokerEmail.trim())
      newErrors.brokerEmail = 'Broker email is required';
    if (formData.brokerEmail && !validateEmail(formData.brokerEmail)) {
      newErrors.brokerEmail = 'Invalid email format';
    }
    if (!formData.pickupCompany.trim())
      newErrors.pickupCompany = 'Pickup company is required';
    if (!formData.pickupDate) newErrors.pickupDate = 'Pickup date is required';
    if (!formData.pickupAddress.trim())
      newErrors.pickupAddress = 'Pickup address is required';
    if (!formData.deliveryCompany.trim())
      newErrors.deliveryCompany = 'Delivery company is required';
    if (!formData.deliveryDate)
      newErrors.deliveryDate = 'Delivery date is required';
    if (!formData.deliveryAddress.trim())
      newErrors.deliveryAddress = 'Delivery address is required';
    if (formData.ratePerMile && isNaN(parseFloat(formData.ratePerMile))) {
      newErrors.ratePerMile = 'Rate per mile must be a valid number';
    }
    if (formData.totalMiles && isNaN(parseInt(formData.totalMiles))) {
      newErrors.totalMiles = 'Total miles must be a valid number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Email validation helper
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Dynamic Change Handler
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle broker document upload
  const handleBrokerDocumentChange = (file: File | null) => {
    if (file) {
      setBrokerDocuments(prev => [...prev, file]);
    }
  };

  // Remove document from broker documents
  const removeBrokerDocument = (index: number) => {
    setBrokerDocuments(prev => prev.filter((_, i) => i !== index));
  };

  // Send documents to broker
  const handleSendToBroker = async () => {
    if (brokerDocuments.length === 0) {
      setErrors(prev => ({
        ...prev,
        document: 'Please upload at least one document',
      }));
      return;
    }

    setIsSendingToBroker(true);
    try {
      const brokerData = new FormData();
      brokerData.append('brokerEmail', formData.brokerEmail);
      brokerData.append('brokerName', formData.brokerName);
      brokerData.append('documentType', documentType);

      brokerDocuments.forEach((doc, index) => {
        brokerData.append(`documents`, doc);
      });

      console.log('Sending documents to broker:', {
        brokerEmail: formData.brokerEmail,
        brokerName: formData.brokerName,
        documentType: documentType,
        documents: brokerDocuments,
      });

      // Uncomment below for actual API integration
      // const response = await fetch('/api/broker/send-documents', {
      //   method: 'POST',
      //   body: brokerData,
      // });
      // const result = await response.json();
      // if (!response.ok) throw new Error(result.message);

      // Clear documents and show success
      setBrokerDocuments([]);
      setDocUploadResetSignal(prev => prev + 1);
      alert('Documents sent to broker successfully!');
    } catch (error) {
      console.error('Error sending to broker:', error);
      setErrors(prev => ({
        ...prev,
        document:
          error instanceof Error
            ? error.message
            : 'Failed to send documents to broker',
      }));
    } finally {
      setIsSendingToBroker(false);
    }
  };

  // Prepare data for API
  const prepareDataForAPI = () => {
    return {
      ...formData,
      logoFile: logoFile,
      ratePerMile: formData.ratePerMile ? parseFloat(formData.ratePerMile) : 0,
      totalMiles: formData.totalMiles ? parseInt(formData.totalMiles) : 0,
      deadheadMiles: formData.deadheadMiles
        ? parseInt(formData.deadheadMiles)
        : 0,
      loadedMiles: formData.loadedMiles ? parseInt(formData.loadedMiles) : 0,
      isRateConfirmationVisible: isRateConfirmationVisible,
      submittedAt: new Date().toISOString(),
    };
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log('Form validation failed');
      return;
    }

    setIsLoading(true);
    try {
      const dataToSubmit = prepareDataForAPI();
      console.log('Submitting Data: ', dataToSubmit);

      // Uncomment below for actual API integration
      // const response = await fetch('/api/loads/create', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(dataToSubmit),
      // });
      // const result = await response.json();
      // if (!response.ok) throw new Error(result.message);

      setIsSuccessModalOpen(true);
      resetForm();
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({
        submit:
          error instanceof Error ? error.message : 'Failed to create load',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      carrier: '',
      loadNumber: '',
      brokerName: '',
      brokerRef: '',
      brokerEmail: '',
      brokerPhone: '',
      pickupCompany: '',
      pickupDate: '',
      pickupTime: '',
      pickupTimeType: 'AM',
      pickupAddress: '',
      deliveryCompany: '',
      deliveryDate: '',
      deliveryTime: '',
      deliveryTimeType: 'PM',
      deliveryAddress: '',
      assignDriver: '',
      assignTruck: '',
      assignTrailer: '',
      ratePerMile: '',
      totalMiles: '',
      deadheadMiles: '',
      loadedMiles: '',
      notes: '',
    });
    setLogoFile(null);
    setUploadResetSignal(prev => prev + 1);
    setIsRateConfirmationVisible(false);
    setBrokerDocuments([]);
    setDocumentType('BOL');
    setDocUploadResetSignal(prev => prev + 1);
    setErrors({});
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to discard all changes?')) {
      resetForm();
    }
  };

  return (
    <div className="">
      <div className="">
        <h1 className="text-2xl font-bold text-[#111827] mb-8">
          Create New Load
        </h1>

        {errors.submit && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Rate Confirmation */}
          <section className="p-6 bg-[#F9FAFB] rounded-2xl border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-[#111827]">
                Rate Confirmation
              </h3>
              <div className="flex items-center gap-3">
                <label className="text-xs font-medium text-gray-600">
                  Make Rate Confirmation visible to assigned driver?
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setIsRateConfirmationVisible(!isRateConfirmationVisible)
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isRateConfirmationVisible ? 'bg-[#2B3674]' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isRateConfirmationVisible
                        ? 'translate-x-6'
                        : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
            <UploadDropzoneField
              className="my-6"
              hint="PNG, JPG up to 5Mb"
              description="Click to upload or drag and drop"
              onFileChange={setLogoFile}
              resetSignal={uploadResetSignal}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <SelectField
                  label="Carrier"
                  name="carrier"
                  placeholder="Select Carrier"
                  value={formData.carrier}
                  onChange={handleChange}
                  options={[
                    { value: 'carrier_1', label: 'Swift Logistics' },
                    { value: 'carrier_2', label: 'Prime Inc' },
                  ]}
                  required
                />
                {errors.carrier && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.carrier}
                  </span>
                )}
              </div>
              <div>
                <InputField
                  label="Load Number"
                  name="loadNumber"
                  placeholder="Enter load number"
                  value={formData.loadNumber}
                  onChange={handleChange}
                />
                {errors.loadNumber && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.loadNumber}
                  </span>
                )}
              </div>
            </div>
          </section>

          {/* Broker Information */}
          <section className="p-6 bg-[#F9FAFB] rounded-2xl border border-gray-100">
            <h3 className="text-sm font-bold text-[#111827] mb-4">
              Broker Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <InputField
                  label="Broker Name"
                  name="brokerName"
                  placeholder="Enter Broker Name"
                  value={formData.brokerName}
                  onChange={handleChange}
                />
                {errors.brokerName && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.brokerName}
                  </span>
                )}
              </div>
              <div>
                <InputField
                  label="Broker Reference Number"
                  name="brokerRef"
                  placeholder="Enter Broker Reference Number"
                  value={formData.brokerRef}
                  onChange={handleChange}
                />
              </div>
              <div>
                <InputField
                  label="Broker Email"
                  name="brokerEmail"
                  type="email"
                  placeholder="Enter Broker Email"
                  value={formData.brokerEmail}
                  onChange={handleChange}
                />
                {errors.brokerEmail && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.brokerEmail}
                  </span>
                )}
              </div>
              <div>
                <InputField
                  label="Broker Phone"
                  name="brokerPhone"
                  placeholder="Enter Broker Phone Number"
                  value={formData.brokerPhone}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Upload Document Section */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="text-sm font-bold text-[#111827] mb-4">
                Upload Document ({brokerDocuments.length})
              </h4>

              <div className="mb-6">
                <SelectField
                  label="Document Type"
                  name="documentType"
                  value={documentType}
                  onChange={e => setDocumentType(e.target.value)}
                  options={[
                    { value: 'BOL', label: 'BOL' },
                    { value: 'POD', label: 'POD' },
                    { value: 'Invoice', label: 'Invoice' },
                    { value: 'Delivery Proof', label: 'Delivery Proof' },
                    { value: 'Rate Confirmation', label: 'Rate Confirmation' },
                    { value: 'Other', label: 'Other' },
                  ]}
                />
              </div>

              <UploadDropzoneField
                className="mb-6"
                hint="PNG, JPG up to 5Mb"
                description="Click to upload or drag and drop"
                onFileChange={handleBrokerDocumentChange}
                resetSignal={docUploadResetSignal}
              />

              {errors.document && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs">
                  {errors.document}
                </div>
              )}

              {/* Uploaded Documents List */}
              {brokerDocuments.length > 0 && (
                <div className="mb-4 p-4 bg-white rounded-lg border border-gray-200">
                  <h5 className="text-xs font-bold text-[#111827] mb-3">
                    Uploaded Documents:
                  </h5>
                  <div className="space-y-2">
                    {brokerDocuments.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg">📄</span>
                          <div className="flex-1">
                            <p className="text-xs font-medium text-gray-700">
                              {doc.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {(doc.size / 1024).toFixed(2)} KB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeBrokerDocument(index)}
                          className="text-red-500 hover:text-red-700 text-sm font-bold transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={handleSendToBroker}
                disabled={isSendingToBroker || brokerDocuments.length === 0}
                className="px-6 py-2.5 rounded-lg font-bold text-white bg-[#2B3674] hover:bg-[#1e2756] disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm flex items-center gap-2"
              >
                {isSendingToBroker ? (
                  <>
                    <span className="inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Sending...
                  </>
                ) : (
                  'Send to Broker'
                )}
              </button>
            </div>
          </section>

          {/* Pickup & Delivery */}
          <div className="grid grid-cols-1 gap-8">
            {/* Pickup */}
            <section className="p-6 bg-[#F9FAFB] rounded-2xl border border-gray-100">
              <h3 className="text-sm font-bold text-[#111827] mb-4">Pickup</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <InputField
                      label="Company Name"
                      name="pickupCompany"
                      placeholder="Enter Company"
                      value={formData.pickupCompany}
                      onChange={handleChange}
                    />
                    {errors.pickupCompany && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.pickupCompany}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <InputField
                      label="Date"
                      name="pickupDate"
                      type="date"
                      value={formData.pickupDate}
                      onChange={handleChange}
                      className="block w-full"
                    />
                    {errors.pickupDate && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.pickupDate}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className=" w-1/2">
                    <div className="flex-1 flex  gap-2 w-full">
                      <div className="flex w-full">
                        <InputField
                          label="Time"
                          name="pickupTime"
                          type="time"
                          value={formData.pickupTime}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="w-28 mt-5">
                        <SelectField
                          label=""
                          name="pickupTimeType"
                          value={formData.pickupTimeType}
                          onChange={handleChange}
                          options={[
                            { value: 'AM', label: 'AM' },
                            { value: 'PM', label: 'PM' },
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex-1">
                    <InputField
                      label="Address"
                      name="pickupAddress"
                      placeholder="Enter Address"
                      value={formData.pickupAddress}
                      onChange={handleChange}
                    />
                    {errors.pickupAddress && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.pickupAddress}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Delivery */}
            <section className="p-6 bg-[#F9FAFB] rounded-2xl border border-gray-100">
              <h3 className="text-sm font-bold text-[#111827] mb-4">
                Delivery
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <InputField
                      label="Company Name"
                      name="deliveryCompany"
                      placeholder="Enter Company"
                      value={formData.deliveryCompany}
                      onChange={handleChange}
                    />
                    {errors.deliveryCompany && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.deliveryCompany}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <InputField
                      label="Date"
                      name="deliveryDate"
                      type="date"
                      value={formData.deliveryDate}
                      onChange={handleChange}
                    />
                    {errors.deliveryDate && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.deliveryDate}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <div className=" w-1/2">
                    <div className="flex items-center gap-2 w-full">
                      <div className="flex-1">
                        <InputField
                          label="Time"
                          name="deliveryTime"
                          type="time"
                          value={formData.deliveryTime}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="w-28 mt-5">
                        <SelectField
                          label=""
                          name="deliveryTimeType"
                          value={formData.deliveryTimeType}
                          onChange={handleChange}
                          options={[
                            { value: 'AM', label: 'AM' },
                            { value: 'PM', label: 'PM' },
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <InputField
                      label="Address"
                      name="deliveryAddress"
                      placeholder="Enter Address"
                      value={formData.deliveryAddress}
                      onChange={handleChange}
                    />
                    {errors.deliveryAddress && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.deliveryAddress}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Assign Driver Section */}
          <section className="p-6 bg-[#F9FAFB] rounded-2xl border border-gray-100">
            <h3 className="text-sm font-bold text-[#111827] mb-4">
              Assign a Driver for This Load
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <SelectField
                label="Assign Driver"
                name="assignDriver"
                placeholder="Select Driver"
                value={formData.assignDriver}
                onChange={handleChange}
                options={[
                  { value: 'd1', label: 'John Doe' },
                  { value: 'd2', label: 'Jane Smith' },
                ]}
              />
              <SelectField
                label="Assign Truck"
                name="assignTruck"
                placeholder="Select Truck"
                value={formData.assignTruck}
                onChange={handleChange}
                options={[
                  { value: 't1', label: 'Truck #204' },
                  { value: 't2', label: 'Truck #501' },
                ]}
              />
              <SelectField
                label="Assign Trailer"
                name="assignTrailer"
                placeholder="Select Trailer"
                value={formData.assignTrailer}
                onChange={handleChange}
                options={[
                  { value: 'tr1', label: 'Flatbed #1' },
                  { value: 'tr2', label: 'Reefer #5' },
                ]}
              />
            </div>

            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <h4 className="text-sm font-bold text-[#111827] mb-4">
                Set Rate & Miles
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <InputField
                    label="Rate/mile ($)"
                    name="ratePerMile"
                    placeholder="0.00"
                    type="number"
                    step="0.01"
                    value={formData.ratePerMile}
                    onChange={handleChange}
                  />
                  {errors.ratePerMile && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.ratePerMile}
                    </span>
                  )}
                </div>
                <div>
                  <InputField
                    label="Total Miles"
                    name="totalMiles"
                    placeholder="0"
                    type="number"
                    value={formData.totalMiles}
                    onChange={handleChange}
                  />
                  {errors.totalMiles && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.totalMiles}
                    </span>
                  )}
                </div>
                <InputField
                  label="Deadhead Miles"
                  name="deadheadMiles"
                  placeholder="0"
                  type="number"
                  value={formData.deadheadMiles}
                  onChange={handleChange}
                />
                <InputField
                  label="Loaded Miles"
                  name="loadedMiles"
                  placeholder="0"
                  type="number"
                  value={formData.loadedMiles}
                  onChange={handleChange}
                />
              </div>
            </div>
          </section>

          {/* Notes */}
          <section>
            <label className="text-sm font-bold text-[#111827] mb-2 block">
              Additional Notes
            </label>
            <textarea
              name="notes"
              placeholder="Enter additional notes..."
              value={formData.notes}
              onChange={handleChange}
              className="w-full h-32 p-4 bg-[#F9FAFB] border border-gray-100 rounded-2xl outline-none focus:border-[#2B3674] text-sm text-gray-600 transition-all resize-none"
            />
          </section>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isLoading}
              className="px-10 py-3 rounded-xl font-bold text-gray-500 border border-gray-100 hover:bg-gray-50 transition-all disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-10 py-3 rounded-xl font-bold text-white bg-[#2B3674] hover:bg-[#1e2756] transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Creating...
                </>
              ) : (
                'Create Load'
              )}
            </button>
          </div>
        </form>
      </div>

      <SubmissionDoneModal
        open={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
    </div>
  );
}