import { useState } from 'react';
import { Calculator, Package, Zap, Clock } from 'lucide-react';

export default function PricingCalculator() {
  const [formData, setFormData] = useState({
    packageType: 'parcel',
    weight: '',
    serviceType: 'standard',
  });

  const calculatePrice = () => {
    const weight = parseFloat(formData.weight) || 0;
    if (weight === 0) return null;

    const basePrice = 10;
    let pricePerKg = 5;

    if (formData.serviceType === 'express') {
      pricePerKg = 8;
    } else if (formData.serviceType === 'overnight') {
      pricePerKg = 12;
    }

    if (formData.packageType === 'freight') {
      pricePerKg *= 1.5;
    }

    return basePrice + (weight * pricePerKg);
  };

  const price = calculatePrice();

  const getDeliveryTime = () => {
    switch (formData.serviceType) {
      case 'overnight':
        return '1 business day';
      case 'express':
        return '2-3 business days';
      default:
        return '5-7 business days';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 animate-fadeInUp">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="w-8 h-8 text-blue-600" />
        <h3 className="text-2xl font-bold text-slate-900">Pricing Calculator</h3>
      </div>

      <p className="text-slate-600 mb-6">
        Get an instant quote for your shipment. Our transparent pricing has no hidden fees.
      </p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Package Type</label>
          <select
            value={formData.packageType}
            onChange={(e) => setFormData({ ...formData, packageType: e.target.value })}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="document">Document</option>
            <option value="parcel">Parcel</option>
            <option value="freight">Freight</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Weight (kg)</label>
          <input
            type="number"
            value={formData.weight}
            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
            placeholder="Enter weight"
            step="0.1"
            min="0.1"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Service Type</label>
          <div className="space-y-3">
            <label className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.serviceType === 'standard' ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-slate-400'}`}>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="serviceType"
                  value="standard"
                  checked={formData.serviceType === 'standard'}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  className="w-4 h-4 text-blue-600"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-slate-600" />
                    <span className="font-semibold text-slate-900">Standard</span>
                  </div>
                  <p className="text-sm text-slate-600 ml-7">5-7 business days</p>
                </div>
              </div>
              <span className="text-blue-600 font-semibold">$5/kg</span>
            </label>

            <label className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.serviceType === 'express' ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-slate-400'}`}>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="serviceType"
                  value="express"
                  checked={formData.serviceType === 'express'}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  className="w-4 h-4 text-blue-600"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-slate-600" />
                    <span className="font-semibold text-slate-900">Express</span>
                  </div>
                  <p className="text-sm text-slate-600 ml-7">2-3 business days</p>
                </div>
              </div>
              <span className="text-blue-600 font-semibold">$8/kg</span>
            </label>

            <label className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.serviceType === 'overnight' ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-slate-400'}`}>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="serviceType"
                  value="overnight"
                  checked={formData.serviceType === 'overnight'}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  className="w-4 h-4 text-blue-600"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-slate-600" />
                    <span className="font-semibold text-slate-900">Overnight</span>
                  </div>
                  <p className="text-sm text-slate-600 ml-7">Next business day</p>
                </div>
              </div>
              <span className="text-blue-600 font-semibold">$12/kg</span>
            </label>
          </div>
        </div>

        {price !== null && (
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white animate-scaleIn">
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-100">Estimated Cost</span>
              <span className="text-sm text-blue-100">Delivery: {getDeliveryTime()}</span>
            </div>
            <div className="text-4xl font-bold">${price.toFixed(2)}</div>
            <p className="text-blue-100 text-sm mt-2">+ $10 base fee included</p>
          </div>
        )}

        <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-600">
          <p className="font-semibold text-slate-900 mb-2">Pricing Details:</p>
          <ul className="space-y-1">
            <li>• Base fee: $10 per shipment</li>
            <li>• Standard: $5 per kg</li>
            <li>• Express: $8 per kg</li>
            <li>• Overnight: $12 per kg</li>
            <li>• Freight packages: +50% surcharge</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
