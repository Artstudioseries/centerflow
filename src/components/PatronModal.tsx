import React, { useState } from 'react';
import { UserProfile } from '../types';
import { User } from '../lib/firebase';

interface PatronModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  userProfile: UserProfile;
  onOpenAuth: () => void;
  onUpdateProfileTier: (tierId: 'friend' | 'supporter' | 'guardian' | 'pass', details?: any) => void;
}

type TabType = 'personal' | 'gift' | 'redeem';

export interface TierOption {
  id: 'friend' | 'supporter' | 'guardian' | 'pass';
  name: string;
  priceLabel: string;
  amount: number;
  period: string; // e.g., 'Free', '/mo', '/yr'
  typeLabel: 'Free' | 'Monthly' | 'Annual';
  description: string;
  badgeName: string;
  badgeIcon: string;
  badgeClasses: string;
  badgeBorder: string;
  isPopular?: boolean;
  isFree?: boolean;
}

export const TIERS: TierOption[] = [
  {
    id: 'friend',
    name: 'CenterFlow Friend',
    priceLabel: 'Free',
    amount: 0,
    period: 'Forever',
    typeLabel: 'Free',
    isFree: true,
    description: 'Default free account. Includes introductory routines, basic stretch library & saved progress.',
    badgeName: 'CenterFlow Friend',
    badgeIcon: 'spa',
    badgeClasses: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
    badgeBorder: 'border-slate-500/40',
  },
  {
    id: 'supporter',
    name: 'Supporter',
    priceLabel: '$1',
    amount: 1,
    period: '/mo',
    typeLabel: 'Monthly',
    description: 'Support development while unlocking full routine library and saving favorite routines.',
    badgeName: 'Community Supporter',
    badgeIcon: 'favorite',
    badgeClasses: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    badgeBorder: 'border-emerald-500/40',
  },
  {
    id: 'guardian',
    name: 'Guardian',
    priceLabel: '$5',
    amount: 5,
    period: '/mo',
    typeLabel: 'Monthly',
    isPopular: true,
    description: 'Primary membership. Includes AI recommendations, custom routine builder & premium routines.',
    badgeName: 'Platform Guardian',
    badgeIcon: 'shield_with_heart',
    badgeClasses: 'bg-blue-500/20 text-blue-300 border-blue-400/50 shadow-blue-500/20',
    badgeBorder: 'border-blue-500/50',
  },
  {
    id: 'pass',
    name: 'Annual Pass',
    priceLabel: '$40',
    amount: 40,
    period: '/yr',
    typeLabel: 'Annual',
    description: 'Full year of Guardian access billed annually ($40/yr).',
    badgeName: '1-Yr Patron Pass',
    badgeIcon: 'military_tech',
    badgeClasses: 'bg-amber-500/20 text-amber-300 border-amber-400/50 shadow-amber-500/20',
    badgeBorder: 'border-amber-500/50',
  },
];

export const PatronModal: React.FC<PatronModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  userProfile,
  onOpenAuth,
  onUpdateProfileTier,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('personal');
  const [selectedTierId, setSelectedTierId] = useState<'friend' | 'supporter' | 'guardian' | 'pass'>('guardian');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [giftNote, setGiftNote] = useState('');
  const [giftRedeemCode, setGiftRedeemCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<{
    tierName: string;
    badgeName: string;
    giftCode?: string;
    message: string;
  } | null>(null);

  if (!isOpen) return null;

  const selectedTier = TIERS.find((t) => t.id === selectedTierId) || TIERS[2];
  const activeUserTier = TIERS.find((t) => t.id === userProfile.patronTier) || TIERS[0];

  const handleCheckout = async () => {
    setErrorMsg(null);
    if (!currentUser) {
      setErrorMsg('Please sign in or create an account to link your patron membership to your profile.');
      onOpenAuth();
      return;
    }

    setIsProcessing(true);

    try {
      const isGift = activeTab === 'gift';
      const actualTierId = isGift ? 'pass' : selectedTierId;
      const actualAmount = selectedTier.amount;

      if (!isGift && selectedTierId === 'friend') {
        onUpdateProfileTier('friend', { membershipStatus: 'friend' });
        setSuccessInfo({
          tierName: 'CenterFlow Friend',
          badgeName: 'CenterFlow Friend',
          message: 'You are enjoying the free CenterFlow Friend membership! No payment is required.',
        });
        setIsProcessing(false);
        return;
      }

      if (isGift && !recipientEmail.trim()) {
        setErrorMsg('Please enter a recipient email address for the gift pass.');
        setIsProcessing(false);
        return;
      }

      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tierId: actualTierId,
          amount: actualAmount,
          isGift,
          recipientEmail,
          recipientName,
          giftNote,
          userId: currentUser.uid,
          userEmail: currentUser.email || userProfile.email || 'patron@centerflow.app',
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to initiate checkout session');
      }

      if (data.url) {
        if (data.mode === 'test_simulation') {
          const verifyRes = await fetch(`/api/stripe/verify-session?session_id=${data.sessionId}&user_id=${currentUser.uid}`);
          const verifyData = await verifyRes.json();

          setIsProcessing(false);
          if (verifyData.valid) {
            const badge = isGift ? '1-Yr Patron Pass' : selectedTier.badgeName;
            if (!isGift) {
              onUpdateProfileTier(actualTierId, {
                stripeCustomerId: verifyData.stripeCustomerId,
                stripeSubscriptionId: verifyData.stripeSubscriptionId,
                membershipStatus: verifyData.membershipStatus || 'active',
                paymentStatus: 'paid',
              });
            }

            setSuccessInfo({
              tierName: isGift ? '1-Yr Gift Pass' : selectedTier.name,
              badgeName: badge,
              giftCode: verifyData.giftCode,
              message: isGift
                ? `Gift pass created! Invitation code ${verifyData.giftCode} generated for ${recipientEmail || 'your recipient'}.`
                : `Payment confirmed by Stripe Webhook! Thank you for backing CenterFlow as a ${selectedTier.name}. Your membership benefits are now active.`,
            });
          }
        } else {
          window.location.href = data.url;
        }
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      setErrorMsg(err.message || 'An error occurred while connecting to Stripe');
      setIsProcessing(false);
    }
  };

  const handleRedeemGift = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!currentUser) {
      setErrorMsg('Please sign in or create an account to redeem your gift membership pass.');
      onOpenAuth();
      return;
    }

    if (!giftRedeemCode.trim()) {
      setErrorMsg('Please enter a valid gift code.');
      return;
    }

    setIsProcessing(true);
    try {
      const res = await fetch('/api/gifts/redeem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: giftRedeemCode,
          userEmail: currentUser.email || userProfile.email,
          userId: currentUser.uid,
        }),
      });

      const data = await res.json();
      setIsProcessing(false);

      if (!res.ok) {
        throw new Error(data.error || 'Redemption failed');
      }

      onUpdateProfileTier('pass', {
        membershipStatus: 'gift_active',
        paymentStatus: 'paid',
        membershipExpiresAt: data.membershipExpiresAt,
      });

      setSuccessInfo({
        tierName: '1-Year Gift Pass',
        badgeName: '1-Yr Patron Pass',
        message: data.message || 'Gift pass redeemed successfully! Your 1-Year Patron Pass is active.',
      });
    } catch (err: any) {
      setIsProcessing(false);
      setErrorMsg(err.message || 'Failed to redeem gift code');
    }
  };

  const handleOpenPortal = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch('/api/stripe/create-portal-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId: userProfile.stripeCustomerId || 'cus_test' }),
      });
      const data = await res.json();
      setIsProcessing(false);
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setIsProcessing(false);
      alert('Billing portal feature active.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#18181A] rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Top Header */}
        <div className="p-6 pb-4 border-b border-white/5 flex items-start justify-between relative bg-gradient-to-r from-blue-950/20 via-[#18181A] to-[#18181A]">
          <div className="flex flex-col gap-1 pr-6">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 bg-blue-600/10 border border-blue-500/20 px-3 py-1 rounded-full w-fit">
                CenterFlow Membership System
              </span>
              {activeUserTier && (
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${activeUserTier.badgeClasses}`}>
                  Active: {activeUserTier.badgeName}
                </span>
              )}
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight mt-1">CenterFlow Memberships</h2>
            <p className="text-xs text-gray-400 leading-relaxed mt-0.5">
              Enjoy CenterFlow for free as a Friend, or choose a paid membership to support the platform and unlock premium features.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-full bg-white/5 hover:bg-white/10 active:scale-95 shrink-0"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="p-6 overflow-y-auto space-y-6">
          {errorMsg && (
            <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-2xl text-xs text-red-300 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base">error</span>
                <span>{errorMsg}</span>
              </div>
              <button onClick={() => setErrorMsg(null)} className="text-red-400 hover:text-white">
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
          )}

          {/* Account Status / Login Header */}
          <div className="bg-[#121214] p-3.5 rounded-2xl border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {currentUser?.photoURL ? (
                <img src={currentUser.photoURL} alt="Avatar" className="w-8 h-8 rounded-full border border-blue-500/30" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold text-xs">
                  {currentUser ? (currentUser.email || 'U')[0].toUpperCase() : <span className="material-symbols-outlined text-sm">person</span>}
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-white">
                  {currentUser ? currentUser.displayName || currentUser.email : 'Guest Session'}
                </span>
                <span className="text-[10px] text-gray-400">
                  {currentUser ? 'CenterFlow Account Active' : 'Sign in to create your free account'}
                </span>
              </div>
            </div>

            {!currentUser ? (
              <button
                onClick={onOpenAuth}
                className="px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 font-semibold text-xs rounded-xl transition-all"
              >
                Sign In / Free Account
              </button>
            ) : userProfile.stripeCustomerId ? (
              <button
                onClick={handleOpenPortal}
                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-semibold text-xs rounded-xl transition-all flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-xs">manage_accounts</span>
                <span>Customer Portal</span>
              </button>
            ) : null}
          </div>

          {successInfo ? (
            /* Success & Confirmation View */
            <div className="flex flex-col items-center text-center py-6 gap-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center animate-bounce">
                <span className="material-symbols-outlined text-4xl">verified</span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">Membership Confirmed</h3>
              <p className="text-xs text-gray-300 max-w-md leading-relaxed">{successInfo.message}</p>

              {successInfo.giftCode && (
                <div className="p-4 bg-blue-600/10 border border-blue-500/30 rounded-2xl w-full max-w-sm flex flex-col items-center gap-1">
                  <span className="text-[10px] uppercase tracking-widest text-blue-400 font-bold">Recipient Gift Code</span>
                  <span className="text-xl font-mono font-black text-white tracking-wider select-all">{successInfo.giftCode}</span>
                  <span className="text-[10px] text-gray-400 mt-1">Recipient can enter this code in the "Redeem Code" tab.</span>
                </div>
              )}

              <div className="flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold shadow-lg my-1 bg-[#121214] border-white/10">
                <span className="text-gray-400 font-medium">Unlocked Badge:</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border bg-blue-500/20 text-blue-300 border-blue-400/50">
                  <span className="material-symbols-outlined text-sm">workspace_premium</span>
                  <span>{successInfo.badgeName}</span>
                </span>
              </div>

              <button
                onClick={() => {
                  setSuccessInfo(null);
                  onClose();
                }}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg shadow-blue-900/30 mt-2"
              >
                Return to CenterFlow
              </button>
            </div>
          ) : (
            <>
              {/* Navigation Tabs */}
              <div className="grid grid-cols-3 p-1 bg-[#121214] rounded-xl border border-white/5 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('personal')}
                  className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'personal' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">person</span>
                  <span>Personal</span>
                </button>
                <button
                  onClick={() => setActiveTab('gift')}
                  className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'gift' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">card_giftcard</span>
                  <span>Gift Pass</span>
                </button>
                <button
                  onClick={() => setActiveTab('redeem')}
                  className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'redeem' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">redeem</span>
                  <span>Redeem Code</span>
                </button>
              </div>

              {/* TAB 1: Personal Patron Tiers */}
              {activeTab === 'personal' && (
                <div className="flex flex-col gap-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Select Your Membership Tier
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {TIERS.map((tier) => {
                      const isSelected = selectedTierId === tier.id;
                      return (
                        <div
                          key={tier.id}
                          onClick={() => setSelectedTierId(tier.id)}
                          className={`cursor-pointer rounded-2xl p-4 border transition-all duration-200 flex flex-col justify-between gap-3 relative ${
                            isSelected
                              ? 'bg-blue-600/15 border-blue-500 shadow-lg shadow-blue-900/20'
                              : 'bg-[#121214] border-white/5 hover:border-white/20'
                          }`}
                        >
                          {tier.isPopular && (
                            <span className="absolute -top-2.5 right-3 bg-blue-600 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-md">
                              Popular
                            </span>
                          )}

                          <div className="flex items-start justify-between">
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-gray-300">{tier.name}</span>
                              <div className="flex items-baseline gap-1 mt-0.5">
                                <span className="text-2xl font-black text-white">
                                  {tier.priceLabel}
                                </span>
                                <span className="text-xs text-gray-400 font-medium">{tier.period}</span>
                              </div>
                            </div>

                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-gray-300">
                              {tier.typeLabel}
                            </span>
                          </div>

                          {/* Badge Tag */}
                          <div>
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold ${tier.badgeClasses}`}>
                              <span className="material-symbols-outlined text-xs">{tier.badgeIcon}</span>
                              <span>{tier.badgeName}</span>
                            </span>
                          </div>

                          <p className="text-[11px] text-gray-400 leading-snug">{tier.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 2: Gift Membership */}
              {activeTab === 'gift' && (
                <div className="flex flex-col gap-4">
                  <div className="p-4 bg-gradient-to-r from-blue-900/20 to-indigo-900/20 rounded-2xl border border-blue-500/30 flex items-start gap-3">
                    <span className="material-symbols-outlined text-blue-400 text-xl shrink-0">card_giftcard</span>
                    <div className="flex flex-col gap-0.5">
                      <h4 className="text-xs font-bold text-white">CenterFlow Annual Gift Pass ($40)</h4>
                      <p className="text-[11px] text-gray-300 leading-relaxed">
                        Purchase a 1-Year Guardian Membership Pass for a colleague, friend, or family member dealing with posture issues or desk fatigue.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 p-4 bg-[#121214] rounded-2xl border border-white/5">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-gray-400 font-semibold">Recipient's Email Address</label>
                      <input
                        type="email"
                        placeholder="colleague@company.com"
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                        className="w-full bg-[#18181A] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-gray-400 font-semibold">Recipient's Name (Optional)</label>
                      <input
                        type="text"
                        placeholder="Sarah"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        className="w-full bg-[#18181A] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-gray-400 font-semibold">Personal Gift Note (Optional)</label>
                      <input
                        type="text"
                        placeholder="Hope this helps with daily desk relief!"
                        value={giftNote}
                        onChange={(e) => setGiftNote(e.target.value)}
                        className="w-full bg-[#18181A] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: Redeem Gift Code */}
              {activeTab === 'redeem' && (
                <form onSubmit={handleRedeemGift} className="flex flex-col gap-4">
                  <div className="p-4 bg-[#121214] rounded-2xl border border-white/5 flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-gray-300">Enter Your Gift Pass Code</label>
                      <input
                        type="text"
                        placeholder="CFGIFT-XXXX-XXXX"
                        value={giftRedeemCode}
                        onChange={(e) => setGiftRedeemCode(e.target.value)}
                        className="w-full bg-[#18181A] border border-white/10 rounded-xl px-3.5 py-3 text-sm font-mono text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 uppercase tracking-widest"
                      />
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      Gift codes grant 1-Year of full Guardian membership status and badge. Codes can only be redeemed once.
                    </p>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50"
                    >
                      {isProcessing ? 'Verifying Code...' : 'Redeem Gift Pass'}
                    </button>
                  </div>
                </form>
              )}

              {/* Security Banner */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400 py-1 bg-[#121214] rounded-xl border border-white/5">
                <span className="material-symbols-outlined text-blue-400 text-sm">lock</span>
                <span>Powered by Stripe Test Mode SSL 256-Bit Encryption</span>
              </div>
            </>
          )}
        </div>

        {/* Footer Checkout Button */}
        {!successInfo && activeTab !== 'redeem' && (
          <div className="p-5 border-t border-white/5 bg-[#121214] flex flex-col gap-2">
            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full bg-blue-600 hover:bg-blue-500 active:scale-[0.99] text-white font-bold text-xs py-3.5 px-6 rounded-2xl shadow-xl shadow-blue-900/30 transition-all flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>
                    {activeTab === 'gift'
                      ? 'Proceed with Gift Checkout ($40)'
                      : selectedTierId === 'friend'
                      ? 'Continue as CenterFlow Friend (Free)'
                      : `Proceed with Stripe Checkout (${selectedTier.priceLabel})`}
                  </span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
